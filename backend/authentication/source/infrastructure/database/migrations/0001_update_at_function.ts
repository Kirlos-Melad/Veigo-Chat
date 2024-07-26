import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";

async function up(connection: DatabaseClient): Promise<void> {
    await connection.execute(`
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

async function down(connection: DatabaseClient): Promise<void> {
    await connection.execute(`DROP FUNCTION update_updated_at_column;`);
}

export { up, down };
