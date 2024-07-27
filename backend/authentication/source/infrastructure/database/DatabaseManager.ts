import pg, { PoolClient, QueryResult, QueryResultRow } from "pg";
import { format as sqlFormatter } from "sql-formatter";
import path from "path";
import { promises as fs } from "fs";

import { Logger } from "@source/application/utilities/Logger";
import { absolutePath } from "@source/application/utilities/AbsolutePath";

const logger = Logger.instance;

enum IsolationLevel {
    ReadUncommitted = "READ UNCOMMITTED",
    ReadCommitted = "READ COMMITTED",
    RepeatableRead = "REPEATABLE READ",
    Serializable = "SERIALIZABLE",
}

abstract class Database {
    private _debugMode: boolean;

    public constructor(debug: boolean) {
        this._debugMode = debug;
    }

    private debug(query: string, values: unknown[] = []): void {
        try {
            const formattedQuery = sqlFormatter(query, {
                language: "postgresql",
                useTabs: true,
                tabWidth: 4,
            });

            logger.information(
                `Query:\n${formattedQuery}\nValues: ${JSON.stringify(values)}`,
            );
        } catch (error) {
            logger.warning("Failed to format SQL query");
            logger.information(
                `Query:\n${query}\nValues: ${JSON.stringify(values)}`,
            );
        }
    }

    protected async executeQuery<T extends QueryResultRow>(
        connection: PoolClient,
        query: string,
        values: unknown[] = [],
    ): Promise<QueryResult<T>> {
        if (this._debugMode) this.debug(query, values);

        try {
            const result = await connection.query<T>(query, values);
            return result;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}

class DatabaseClient extends Database {
    private _connection: PoolClient;
    private _isConnected: boolean;
    private _inTransaction: boolean;

    public constructor(connection: PoolClient, debug: boolean = false) {
        super(debug);

        this._connection = connection;
        this._isConnected = true;
        this._inTransaction = false;
    }

    public get isConnected(): boolean {
        return this._isConnected;
    }

    public get inTransaction(): boolean {
        return this._inTransaction;
    }

    public async execute<T extends QueryResultRow>(
        query: string,
        values: unknown[] = [],
    ): Promise<QueryResult<T>> {
        return await this.executeQuery(this._connection, query, values);
    }

    public async startTransaction(
        isolationLevel: IsolationLevel,
    ): Promise<void> {
        await this.execute(
            `BEGIN TRANSACTION ISOLATION LEVEL ${isolationLevel}`,
        );
        this._inTransaction = true;
    }

    public async commitTransaction(): Promise<void> {
        await this.execute("COMMIT TRANSACTION;");
        this._inTransaction = false;
    }

    public async rollbackTransaction(): Promise<void> {
        await this.execute("ROLLBACK TRANSACTION;");
        this._inTransaction = false;
    }

    public async release(): Promise<void> {
        if (this._inTransaction) {
            await this.rollbackTransaction();
            throw new Error(
                "Closing connection while still in transaction, Rolled back before closing",
            );
        }

        if (this.isConnected) {
            this._connection.release();
            this._isConnected = false;
        } else throw new Error("Trying to close a connection already closed.");
    }
}

export class DatabaseManager extends Database {
    private static _instance: DatabaseManager;
    private _migrationsTableName: string;
    private _migrationsPath: string;
    private _pool: pg.Pool;

    private constructor(options: {
        connection: string;
        migrationsPath?: string;
        debug?: boolean;
    }) {
        super(options.debug || false);
        this._migrationsTableName = "migrations";
        this._migrationsPath = options.migrationsPath || "migrations";

        this._pool = new pg.Pool({
            connectionString: options.connection,
        });
    }

    public static createInstance(options: {
        connection: string;
        migrationsPath?: string;
        debug?: boolean;
    }): DatabaseManager {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!DatabaseManager._instance) {
            DatabaseManager._instance = new DatabaseManager(options);
        }

        return DatabaseManager._instance;
    }

    public static get instance(): DatabaseManager {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!DatabaseManager._instance)
            throw new Error("DatabaseManager not initialized");

        return DatabaseManager._instance;
    }

    public async leaseConnection(): Promise<DatabaseClient> {
        const client = await this._pool.connect();
        return new DatabaseClient(client);
    }

    private async migrationsTableUp(db: DatabaseClient): Promise<void> {
        await db.execute(`
			CREATE TABLE IF NOT EXISTS "${this._migrationsTableName}" (
				"name" TEXT PRIMARY KEY,
				"createdAt" TIMESTAMP NOT NULL DEFAULT current_timestamp,
				"updatedAt" TIMESTAMP NOT NULL DEFAULT current_timestamp
			);
		`);

        await db.execute(`
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

        await db.execute(`
			CREATE OR REPLACE TRIGGER update_${this._migrationsTableName}_updated_at
				BEFORE UPDATE
				ON "${this._migrationsTableName}"
				FOR EACH ROW
				EXECUTE FUNCTION update_updated_at_column()
        `);
    }

    private async migrationExists(
        connection: DatabaseClient,
        name: string,
    ): Promise<boolean> {
        const query = `
			SELECT *
			FROM "${this._migrationsTableName}"
			WHERE "name" = '${name}';
		`;

        const result = await connection.execute(query);

        return result.rowCount != null && result.rowCount > 0;
    }

    private async addMigration(
        connection: DatabaseClient,
        name: string,
    ): Promise<void> {
        const query = `
			INSERT INTO "${this._migrationsTableName}" ("name") VALUES('${name}');
		`;

        await connection.execute(query);
    }

    public async migrate(): Promise<void> {
        const client = await this.leaseConnection();
        await client.startTransaction(IsolationLevel.Serializable);

        try {
            logger.information(`Creating ${this._migrationsTableName} table`);
            await this.migrationsTableUp(client);

            const migrationsPath = path.join(
                absolutePath(import.meta.url),
                this._migrationsPath,
            );

            const files = await fs.readdir(migrationsPath, {
                withFileTypes: true,
            });

            logger.information("Starting Migrations");
            for (const file of files) {
                if (!file.isFile()) continue;

                const migrationName = file.name.split(".")[0];

                logger.information(`Checking if ${migrationName} exists`);
                if (await this.migrationExists(client, migrationName)) {
                    logger.information(`Skipping ${migrationName}`);
                    continue;
                }

                logger.information(`Migration doesn't exist, Migrating...`);
                const migrator = (await import(
                    `${file.path}/${file.name}`
                )) as unknown;

                if (
                    typeof migrator !== "object" ||
                    typeof migrator === "undefined" ||
                    migrator == null ||
                    !Object.hasOwn(migrator, "up")
                )
                    throw new Error(
                        `Migration ${migrationName} doesn't have an up function`,
                    );

                // TODO: Try to find a better solution
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
                (migrator as any).up(client);
                await this.addMigration(client, migrationName);

                logger.information(`Migrated ${migrationName}`);
            }

            await client.commitTransaction();
            await client.release();
        } catch (error) {
            await client.rollbackTransaction();
            await client.release();
            throw error;
        }
    }
}

export { IsolationLevel };
export type { DatabaseClient };
