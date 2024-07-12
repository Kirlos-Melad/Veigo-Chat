import DatabaseManager from "@source/infrastructure/database/DatabaseManager";

async function BeforeAll() {
	const dbManager = DatabaseManager.CreateInstance({
		connection: process.env.DATABASE_CONNECTION,
	});
	const connection = await dbManager.LeaseConnection();
	await connection.StartTransaction("SERIALIZABLE");

	return connection;
}

async function AfterAll(connection: any) {
	await connection.RollbackTransaction();
	await connection.Release();
}

export const DatabaseHooks = {
	BeforeAll,
	AfterAll,
};
