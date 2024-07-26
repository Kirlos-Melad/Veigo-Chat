import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";

async function up(connection: DatabaseClient): Promise<void> {
    await connection.execute(`
        CREATE TABLE "devices" (
            "accountId" UUID REFERENCES "accounts" NOT NULL,
            "clientId" TEXT NOT NULL,

            "accessTokenId" VARCHAR(32) NOT NULL,
            "forceRefreshToken" BOOLEAN NOT NULL DEFAULT FALSE,
            
            "refreshTokenId" VARCHAR(32) NOT NULL,
            "forceSignIn" BOOLEAN NOT NULL DEFAULT FALSE,
            
            "createdAt" TIMESTAMP NOT NULL DEFAULT current_timestamp,
            "updatedAt" TIMESTAMP NOT NULL DEFAULT current_timestamp,

            PRIMARY KEY("accountId", "clientId")
        );
    `);

    await connection.execute(`
        CREATE TRIGGER update_devices_updated_at
			BEFORE UPDATE
			ON "devices"
			FOR EACH ROW
			EXECUTE FUNCTION update_updated_at_column()
        `);
}

async function down(connection: DatabaseClient): Promise<void> {
    await connection.execute(
        `DROP TRIGGER update_devices_updated_at ON "devices";`,
    );
    await connection.execute(`DROP TABLE IF EXISTS "devices";`);
}

export { up, down };
