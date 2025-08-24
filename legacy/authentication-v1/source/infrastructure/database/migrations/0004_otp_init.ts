import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";

async function up(connection: DatabaseClient): Promise<void> {
    await connection.execute(`
        CREATE TABLE "otp" (
            "value" TEXT PRIMARY KEY,
            
            "createdAt" TIMESTAMP NOT NULL DEFAULT current_timestamp,
            "expiresAt" TIMESTAMP NOT NULL
        );
    `);
}

async function down(connection: DatabaseClient): Promise<void> {
    await connection.execute(`DROP TABLE IF EXISTS "otp";`);
}

export { up, down };
