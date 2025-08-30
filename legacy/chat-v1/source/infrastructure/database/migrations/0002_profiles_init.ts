import { DatabaseClient } from "../DatabaseManager";

async function up(connection: DatabaseClient) {
	await connection.Execute(`
        CREATE TABLE "profiles" (
            "id" UUID PRIMARY KEY,

            "photoPath" TEXT,
            "name" TEXT NOT NULL,
            "about" TEXT NOT NULL,

            "createdAt" TIMESTAMP NOT NULL DEFAULT current_timestamp,
            "updatedAt" TIMESTAMP NOT NULL DEFAULT current_timestamp
        );
    `);

	await connection.Execute(`
        CREATE TRIGGER update_profiles_updated_at
            BEFORE UPDATE
            ON "profiles"
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column()
        `);
}

async function down(connection: DatabaseClient) {
	await connection.Execute(`DROP TRIGGER update_profiles_updated_at ON "profiles";`);
	await connection.Execute(`DROP TABLE IF EXISTS "profiles";`);
}

export { up, down };
