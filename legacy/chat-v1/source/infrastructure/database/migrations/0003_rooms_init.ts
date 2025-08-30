import { DatabaseClient } from "../DatabaseManager";

async function up(connection: DatabaseClient) {
	await connection.Execute(`
        CREATE TABLE "rooms" (
            "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),

            "photoPath" TEXT,
            "name" TEXT NOT NULL,
            "description" TEXT,

            "type" TEXT NOT NULL,
            "privacy" TEXT NOT NULL,
            
            "createdAt" TIMESTAMP NOT NULL DEFAULT current_timestamp,
            "updatedAt" TIMESTAMP NOT NULL DEFAULT current_timestamp
        );
    `);

	await connection.Execute(`
        CREATE TRIGGER update_rooms_updated_at
			BEFORE UPDATE
			ON "rooms"
			FOR EACH ROW
			EXECUTE FUNCTION update_updated_at_column()
        `);
}

async function down(connection: DatabaseClient) {
	await connection.Execute(`DROP TRIGGER update_rooms_updated_at ON "rooms";`);
	await connection.Execute(`DROP TABLE IF EXISTS "rooms";`);
}

export { up, down };
