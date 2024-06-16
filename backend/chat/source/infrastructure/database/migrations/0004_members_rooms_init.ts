import { DatabaseClient } from "../DatabaseManager";

async function up(connection: DatabaseClient) {
	await connection.Execute(`
        CREATE TABLE "members_rooms" (
            "memberId" UUID REFERENCES profiles("id"),
            "roomId" UUID REFERENCES rooms("id"),
            
            "createdAt" TIMESTAMP NOT NULL DEFAULT current_timestamp,
            "updatedAt" TIMESTAMP NOT NULL DEFAULT current_timestamp,

            PRIMARY KEY ("memberId", "roomId")
        );
    `);

	await connection.Execute(`CREATE INDEX ON "members_rooms" ("roomId");`);

	await connection.Execute(`
        CREATE TRIGGER update_members_rooms_updated_at
			BEFORE UPDATE
			ON "members_rooms"
			FOR EACH ROW
			EXECUTE FUNCTION update_updated_at_column()
        `);
}

async function down(connection: DatabaseClient) {
	await connection.Execute(
		`DROP TRIGGER update_members_rooms_updated_at ON "members_rooms";`,
	);
	await connection.Execute(`DROP TABLE IF EXISTS "members_rooms";`);
}

export { up, down };
