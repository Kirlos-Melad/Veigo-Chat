import { DatabaseClient } from "source/infrastructure/database/DatabaseManager";

async function up(connection: DatabaseClient) {
	await connection.Execute(`
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
}

async function down(connection: DatabaseClient) {
	await connection.Execute(`DROP FUNCTION update_updated_at_column;`);
}

export { up, down };
