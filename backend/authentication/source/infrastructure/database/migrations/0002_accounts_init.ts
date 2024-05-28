import { DatabaseClient } from "../DatabaseManager";

async function up(connection: DatabaseClient) {
	await connection.Execute(`
        CREATE TABLE "accounts" (
            "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),

            "email" TEXT UNIQUE NOT NULL,
            "isEmailVerified" BOOLEAN NOT NULL DEFAULT FALSE,
            
            "phone" TEXT UNIQUE,
            "isPhoneVerified" BOOLEAN NOT NULL DEFAULT FALSE,

            "createdAt" TIMESTAMP NOT NULL DEFAULT current_timestamp,
            "updatedAt" TIMESTAMP NOT NULL DEFAULT current_timestamp
        );
    `);

	await connection.Execute(`
        CREATE TRIGGER update_accounts_updated_at
            BEFORE UPDATE
            ON "accounts"
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column()
        `);
}

async function down(connection: DatabaseClient) {
	await connection.Execute(`DROP TRIGGER update_accounts_updated_at ON "accounts";`);
	await connection.Execute(`DROP TABLE IF EXISTS "accounts";`);
}

export { up, down };
