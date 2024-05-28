import { DatabaseClient } from "../DatabaseManager";

async function up(connection: DatabaseClient) {
	await connection.Execute(`
        CREATE TABLE "otp" (
            "value" TEXT PRIMARY KEY,
            
            "createdAt" TIMESTAMP NOT NULL DEFAULT current_timestamp,
            "expiresAt" TIMESTAMP NOT NULL
        );
    `);
}

async function down(connection: DatabaseClient) {
	await connection.Execute(`DROP TABLE IF EXISTS "otp";`);
}

export { up, down };
