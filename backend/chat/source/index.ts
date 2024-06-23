import grpc from "@grpc/grpc-js";

import ServerManager from "@source/infrastructure/grpc/ServerManager.ts";
import ProfileService from "@source/application/services/Profile.service.ts";
import Environments from "@source/configurations/Environments.js";
import Logger from "./application/utilities/Logger.ts";
import DatabaseManager from "./infrastructure/database/DatabaseManager.ts";
import RoomService from "./application/services/Room.service.ts";
import MessageService from "./application/services/Message.service.ts";
import MemberRoomService from "./application/services/MemberRoom.service.ts";
import AuthorizationManager from "./application/utilities/AuthorizationManager.ts";
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

	Logger.information("Creating Authorization Manager");
	AuthorizationManager.CreateInstance(Environments.AUTHORIZATION_CONNECTION);

	Logger.information("Creating services");

	const serverManager = ServerManager.CreateInstance(
		Environments.SERVICE_ADDRESS,
		grpc.ServerCredentials.createInsecure(),
	);

	serverManager.AddService(
		"source/types/generated/protos/definitions/HealthCheck.proto",
		HealthCheckService,
	);
	serverManager.AddService(
		"source/types/generated/protos/definitions/Profile.proto",
		ProfileService,
	);
	serverManager.AddService(
		"source/types/generated/protos/definitions/Room.proto",
		RoomService,
	);
	serverManager.AddService(
		"source/types/generated/protos/definitions/Message.proto",
		MessageService,
	);
	serverManager.AddService(
		"source/types/generated/protos/definitions/MemberRoom.proto",
		MemberRoomService,
	);

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
