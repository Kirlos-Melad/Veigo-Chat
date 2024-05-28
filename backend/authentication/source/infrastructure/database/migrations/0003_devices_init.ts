import { DatabaseClient } from "../DatabaseManager";

async function up(connection: DatabaseClient) {
	await connection.Execute(`
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

	await connection.Execute(`
        CREATE TRIGGER update_devices_updated_at
			BEFORE UPDATE
			ON "devices"
			FOR EACH ROW
			EXECUTE FUNCTION update_updated_at_column()
        `);
}

async function down(connection: DatabaseClient) {
	await connection.Execute(`DROP TRIGGER update_devices_updated_at ON "devices";`);
	await connection.Execute(`DROP TABLE IF EXISTS "devices";`);
}

export { up, down };
