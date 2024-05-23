import { DatabaseClient } from "../DatabaseManager";

async function up(connection: DatabaseClient) {
	await connection.Execute(`
        CREATE TABLE "messages" (
            "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),

            "roomId" UUID REFERENCES rooms("id"),
            "senderId" UUID REFERENCES profiles("id"),
            "content" TEXT NOT NULL,
            
            "createdAt" TIMESTAMP NOT NULL DEFAULT current_timestamp,
            "updatedAt" TIMESTAMP NOT NULL DEFAULT current_timestamp
        );
    `);

	await connection.Execute(`
        CREATE TRIGGER update_messages_updated_at
			BEFORE UPDATE
			ON "messages"
			FOR EACH ROW
			EXECUTE FUNCTION update_updated_at_column()
        `);
}

async function down(connection: DatabaseClient) {
	await connection.Execute(
		`DROP TRIGGER update_messages_updated_at ON "messages";`,
	);
	await connection.Execute(`DROP TABLE IF EXISTS "messages";`);
}

export { up, down };
