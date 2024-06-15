import axios from "axios";

import Logger from "./Logger";
import { Metadata } from "@grpc/grpc-js";
import JsonWebToken from "./JsonWebToken";

class AuthorizationManager {
	private static sInstance: AuthorizationManager;

	private mConnection: string;

	private constructor(connection: string) {
		this.mConnection = connection;
	}

	public static CreateInstance(connection: string): AuthorizationManager {
		if (!AuthorizationManager.sInstance) {
			AuthorizationManager.sInstance = new AuthorizationManager(
				connection,
			);
		}

		return AuthorizationManager.sInstance;
	}

	public static get instance(): AuthorizationManager {
		if (!AuthorizationManager.sInstance) {
			throw new Error("AuthorizationManager not initialized");
		}

		return AuthorizationManager.sInstance;
	}

	public async GetUserId(metadata: Metadata): Promise<string> {
		const token = (metadata.get("token")[0] as string).split(" ")[1];
		const info = await JsonWebToken.Verify(token);

		return info.subject!.accountId;
	}

	private async Ask(policy: string, input: any): Promise<boolean> {
		try {
			const response = await axios.post(
				`${this.mConnection}/v1/data/${policy}`,
				{ input },
			);

			return response.data.result && response.data.result.allow;
		} catch (error) {
			Logger.error(`${this.mConnection}/v1/data/${policy}`, input, error);
			return false;
		}
	}

	public async CanReadRoom(room: string, user: string): Promise<boolean> {
		return await this.Ask("read_room", {
			roomId: room,
			userId: user,
		});
	}

	public async CanEditRoom(room: string, user: string): Promise<boolean> {
		return await this.Ask("edit_room", {
			roomId: room,
			userId: user,
		});
	}

	public async CanSendMessage(room: string, user: string): Promise<boolean> {
		return await this.Ask("send_message", {
			roomId: room,
			userId: user,
		});
	}

	public async CanEditMessage(
		user: string,
		room: string,
		message: string,
	): Promise<boolean> {
		return await this.Ask("edit_message", {
			userId: user,
			roomId: room,
			messageId: message,
		});
	}
}

export default AuthorizationManager;
