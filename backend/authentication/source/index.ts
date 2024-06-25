import grpc from "@grpc/grpc-js";

import ServerManager from "@source/infrastructure/grpc/ServerManager.ts";
import Environments from "@source/configurations/Environments.js";
import Logger from "./application/utilities/Logger.ts";
import DatabaseManager from "./infrastructure/database/DatabaseManager.ts";
import AuthenticationService from "./application/services/Authentication.service.ts";
import HealthCheckService from "./application/services/HealthCheck.service.ts";

async function Migrate() {
	Logger.information("Creating database manager");
	const databaseManager = DatabaseManager.CreateInstance(
		Environments.DATABASE_CONNECTION,
	);

	Logger.information("Running database migrations");
	await databaseManager.Migrate();
}

async function Start() {
	Logger.information("Creating database manager");
	const databaseManager = DatabaseManager.CreateInstance(
		Environments.DATABASE_CONNECTION,
	);

	Logger.information("Creating services");

	const serverManager = ServerManager.CreateInstance(
		Environments.SERVICE_ADDRESS,
		grpc.ServerCredentials.createInsecure(),
	);

	const PROTOS_PATH = "source/types/generated/protos/definitions";
	serverManager.AddService(PROTOS_PATH, {
		file: "health_check.proto",
		packageName: "health_check",
		serviceName: "HealthCheck",
		serviceImplementation: HealthCheckService,
	});

	serverManager.AddService(PROTOS_PATH, {
		file: "authentication.proto",
		packageName: "authentication",
		serviceName: "Authentication",
		serviceImplementation: AuthenticationService,
	});

	Logger.information("Starting server");
	const port = await serverManager.StartServer();

	Logger.information(`Server running on port ${port}`);

	return {
		Server: serverManager,
		Database: databaseManager,
	};
}

function Help() {
	Logger.information("Available commands:");
	Logger.information("migrate: Run the database migrations");
	Logger.information("start: Start the server");
}

try {
	if (process.argv.length < 3) {
		throw new Error(
			"No arguments provided. Try 'help' for more information.",
		);
	}

	const command = process.argv[2];

	switch (command) {
		case "migrate":
			await Migrate();
			break;

		case "start":
			await Start();
			break;

		case "help":
			Help();
			break;

		default:
			throw new Error(
				"Invalid argument. Try 'help' for more information.",
			);
	}
} catch (error: any) {
	Logger.error(error);
	process.exit(1);
}

export { Start, Migrate, Help };
