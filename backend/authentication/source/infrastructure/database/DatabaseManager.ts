import pg, { PoolClient, QueryResult, QueryResultRow } from "pg";
import { format as sqlFormatter } from "sql-formatter";
import path from "path";
import { promises as fs } from "fs";

import Logger from "@source/application/utilities/Logger";
import AbsolutePath from "@source/application/utilities/AbsolutePath";

const IsolationLevel = {
	READ_UNCOMMITTED: "READ UNCOMMITTED",
	READ_COMMITTED: "READ COMMITTED",
	REPEATABLE_READ: "REPEATABLE READ",
	SERIALIZABLE: "SERIALIZABLE",
	SNAPSHOT: "SNAPSHOT",
} as const;

type IsolationLevel = (typeof IsolationLevel)[keyof typeof IsolationLevel];

abstract class Database {
	protected async ExecuteQuery<T extends QueryResultRow>(
		connection: PoolClient,
		query: string,
		values: any[] = [],
	): Promise<QueryResult<T>> {
		try {
			const formattedQuery = sqlFormatter(query, {
				language: "postgresql",
				useTabs: true,
				tabWidth: 4,
			});

			Logger.information(
				`Query:\n${formattedQuery}\nValues: ${JSON.stringify(values)}`,
			);
		} catch (error) {
			Logger.warning("Failed to format SQL query");
			Logger.information(
				`Query:\n${query}\nValues: ${JSON.stringify(values)}`,
			);
		}

		try {
			const result = await connection.query<T>(query, values);
			return result;
		} catch (error) {
			Logger.error(error);
			throw error;
		}
	}
}

class DatabaseClient extends Database {
	private mConnection: PoolClient;
	private mIsConnected: boolean;
	private mInTransaction: boolean;

	public constructor(connection: PoolClient) {
		super();

		this.mConnection = connection;
		this.mIsConnected = true;
		this.mInTransaction = false;
	}

	public get isConnected() {
		return this.mIsConnected;
	}

	public get inTransaction() {
		return this.mInTransaction;
	}

	public async Execute<T extends QueryResultRow>(
		query: string,
		values: any[] = [],
	): Promise<QueryResult<T>> {
		return await this.ExecuteQuery(this.mConnection, query, values);
	}

	public async StartTransaction(isolationLevel: IsolationLevel) {
		await this.Execute(
			`BEGIN TRANSACTION ISOLATION LEVEL ${isolationLevel}`,
		);
		this.mInTransaction = true;
	}

	public async CommitTransaction() {
		await this.Execute("COMMIT TRANSACTION;");
		this.mInTransaction = false;
	}

	public async RollbackTransaction() {
		await this.Execute("ROLLBACK TRANSACTION;");
		this.mInTransaction = false;
	}

	public async Release() {
		if (this.mInTransaction) {
			await this.RollbackTransaction();
			throw new Error(
				"Closing connection while still in transaction, Rolled back before closing",
			);
		}

		if (this.isConnected) {
			this.mConnection.release();
			this.mIsConnected = false;
		} else throw new Error("Trying to close a connection already closed.");
	}
}

class DatabaseManager extends Database {
	private static sInstance: DatabaseManager;
	private mMigrationsTableName: string;
	private mMigrationsPath: string;
	private mPool: pg.Pool;

	protected constructor(options: {
		connection: string;
		migrationsPath?: string;
	}) {
		super();
		this.mMigrationsTableName = "migrations";
		this.mMigrationsPath = options.migrationsPath || "migrations";

		this.mPool = new pg.Pool({
			connectionString: options.connection,
		});
	}

	public static CreateInstance(options: {
		connection: string;
		migrationsPath?: string;
	}) {
		if (!DatabaseManager.sInstance) {
			DatabaseManager.sInstance = new DatabaseManager(options);
		}

		return DatabaseManager.sInstance;
	}

	public static get instance() {
		return DatabaseManager.sInstance;
	}

	public async LeaseConnection(): Promise<DatabaseClient> {
		const client = await this.mPool.connect();
		return new DatabaseClient(client);
	}

	private async MigrationsTableUp(db: DatabaseClient) {
		await db.Execute(`
			CREATE TABLE IF NOT EXISTS "${this.mMigrationsTableName}" (
				"name" TEXT PRIMARY KEY,
				"createdAt" TIMESTAMP NOT NULL DEFAULT current_timestamp,
				"updatedAt" TIMESTAMP NOT NULL DEFAULT current_timestamp
			);
		`);

		await db.Execute(`
			CREATE OR REPLACE FUNCTION update_updated_at_column()
				RETURNS TRIGGER
				LANGUAGE PLPGSQL
				AS $$
				BEGIN
					NEW."updatedAt" = current_timestamp;
					RETURN NEW;
				END;
				$$
        `);

		await db.Execute(`
			CREATE OR REPLACE TRIGGER update_${this.mMigrationsTableName}_updated_at
				BEFORE UPDATE
				ON "${this.mMigrationsTableName}"
				FOR EACH ROW
				EXECUTE FUNCTION update_updated_at_column()
        `);
	}

	private async MigrationExists(connection: DatabaseClient, name: string) {
		const query = `
			SELECT *
			FROM "${this.mMigrationsTableName}"
			WHERE "name" = '${name}';
		`;

		const result = await connection.Execute(query);

		return result.rowCount && result.rowCount > 0;
	}

	private async AddMigration(connection: DatabaseClient, name: string) {
		const query = `
			INSERT INTO "${this.mMigrationsTableName}" ("name") VALUES('${name}');
		`;

		await connection.Execute(query);
	}

	public async Migrate() {
		const client = await this.LeaseConnection();
		await client.StartTransaction("SERIALIZABLE");

		try {
			Logger.information(`Creating ${this.mMigrationsTableName} table`);
			await this.MigrationsTableUp(client);

			const migrationsPath = path.join(
				AbsolutePath(import.meta.url),
				this.mMigrationsPath,
			);

			const files = await fs.readdir(migrationsPath, {
				withFileTypes: true,
			});

			Logger.information("Starting Migrations");
			for (const file of files) {
				if (!file.isFile()) continue;

				const migration_name = file.name.split(".")[0];

				Logger.information(`Checking if ${migration_name} exists`);
				if (await this.MigrationExists(client, migration_name)) {
					Logger.information(`Skipping ${migration_name}`);
					continue;
				}

				Logger.information(`Migration doesn't exist, Migrating...`);
				(await import(`${file.path}/${file.name}`)).up(client);
				await this.AddMigration(client, migration_name);

				Logger.information(`Migrated ${migration_name}`);
			}

			await client.CommitTransaction();
			await client.Release();
		} catch (error) {
			await client.RollbackTransaction();
			await client.Release();
			throw error;
		}
	}
}

export default DatabaseManager;
export type { DatabaseClient };
