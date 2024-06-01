import grpc from "@grpc/grpc-js";

import ServerManager from "@source/infrastructure/grpc/ServerManager.ts";
import ProfileService from "@source/application/services/Profile.service.ts";
import Environments from "@source/configurations/Environments.js";
import Logger from "./application/utilities/Logger.ts";
import DatabaseManager from "./infrastructure/database/DatabaseManager.ts";
import ProfileRepository from "./infrastructure/database/repositories/Profile.repository.ts";
import RoomRepository from "./infrastructure/database/repositories/Room.repository.ts";
import RoomService from "./application/services/Room.service.ts";
import MessageRepository from "./infrastructure/database/repositories/Message.repository.ts";
import MessageService from "./application/services/Message.service.ts";
import MemberRoomRepository from "./infrastructure/database/repositories/MemberRoom.repository.ts";
import MemberRoomService from "./application/services/MemberRoom.service.ts";
import KafkaProducer from "./infrastructure/kafka/KafkaProducer.ts";

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

	Logger.information("Creating Kafka producer");
	const kafkaProducer = KafkaProducer.CreateInstance(
		Environments.KAFKA_CLIENT_ID,
		Environments.KAFKA_BROKERS,
	);
	await kafkaProducer.Start();

	Logger.information("Creating services");
	const profileRepository = new ProfileRepository();
	const profileService = new ProfileService(profileRepository);

	const roomRepository = new RoomRepository();
	const roomService = new RoomService(roomRepository);

	const messageRepository = new MessageRepository();
	const messageService = new MessageService(messageRepository);

	const userRoomRepository = new MemberRoomRepository();
	const userRoomService = new MemberRoomService(userRoomRepository);

	const serverManager = ServerManager.CreateInstance(
		Environments.SERVICE_ADDRESS,
		grpc.ServerCredentials.createInsecure(),
	);
	serverManager.AddService(
		"source/types/generated/protos/definitions/Profile.proto",
		profileService.handlers,
	);
	serverManager.AddService(
		"source/types/generated/protos/definitions/Room.proto",
		roomService.handlers,
	);
	serverManager.AddService(
		"source/types/generated/protos/definitions/Message.proto",
		messageService.handlers,
	);
	serverManager.AddService(
		"source/types/generated/protos/definitions/MemberRoom.proto",
		userRoomService.handlers,
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
