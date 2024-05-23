import { DatabaseClient } from "../DatabaseManager";

async function up(connection: DatabaseClient) {
	await connection.Execute(`
        CREATE TABLE "user_rooms" (
            "userId" UUID REFERENCES profiles("id"),
            "roomId" UUID REFERENCES rooms("id"),
            
            "createdAt" TIMESTAMP NOT NULL DEFAULT current_timestamp,
            "updatedAt" TIMESTAMP NOT NULL DEFAULT current_timestamp,

            PRIMARY KEY ("userId", "roomId")
        );
    `);

	await connection.Execute(`
        CREATE TRIGGER update_user_rooms_updated_at
			BEFORE UPDATE
			ON "user_rooms"
			FOR EACH ROW
			EXECUTE FUNCTION update_updated_at_column()
        `);
}

async function down(connection: DatabaseClient) {
	await connection.Execute(
		`DROP TRIGGER update_user_rooms_updated_at ON "user_rooms";`,
	);
	await connection.Execute(`DROP TABLE IF EXISTS "user_rooms";`);
}

export { up, down };
