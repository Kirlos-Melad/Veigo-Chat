import GRPCServiceManager from "./GRPCServiceManager.ts";
import Logger from "../utilities/Logger.ts";
import { ProfileClient } from "../types/generated/protos/chat/ProfilePackage/Profile.ts";
import { RoomClient } from "../types/generated/protos/chat/RoomPackage/Room.ts";
import { UserRoomClient } from "../types/generated/protos/chat/UserRoomPackage/UserRoom.ts";
import { MessageClient } from "../types/generated/protos/chat/MessagePackage/Message.ts";
import { AuthenticationClient } from "../types/generated/protos/authentication/AuthenticationPackage/Authentication.ts";

type AuthenticationService = GRPCServiceManager<{
	Authentication: AuthenticationClient;
}>;

type ChatService = GRPCServiceManager<{
	Profile: ProfileClient;
	Room: RoomClient;
	UserRoom: UserRoomClient;
	Message: MessageClient;
}>;

type Services = {
	Auth: AuthenticationService;
	Chat: ChatService;
};

class GRPCServiceManagerRegistry<T extends Services = Services> {
	private static sInstance: GRPCServiceManagerRegistry;

	private mGRPCServiceManagers: T;

	private constructor(services: T) {
		this.mGRPCServiceManagers = services;
	}

	public static CreateInstance<T extends Services = Services>(services: T) {
		if (!GRPCServiceManagerRegistry.sInstance)
			GRPCServiceManagerRegistry.sInstance =
				new GRPCServiceManagerRegistry(services);

		return GRPCServiceManagerRegistry.sInstance;
	}

	public static get instance() {
		return GRPCServiceManagerRegistry.sInstance;
	}

	public Get<U extends keyof T>(name: U): T[U] {
		return this.mGRPCServiceManagers[name];
	}

	public async Start(): Promise<void> {
		await Promise.all(
			Object.values(this.mGRPCServiceManagers).map(
				(service: GRPCServiceManager<any>) =>
					new Promise((resolve, reject) => {
						Logger.information(
							`Connecting to ${service.name} service`,
						);
						service
							.Start()
							.then(() =>
								resolve(
									Logger.information(
										`Connected to ${service.name} service`,
									),
								),
							)
							.catch((error) => reject(error));
					}),
			),
		);
	}
}

export default GRPCServiceManagerRegistry;
export type { Services, ChatService };
