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

	private async Ask(policy: string, question: any): Promise<boolean> {
		try {
			const response = await axios.post(
				`${this.mConnection}/v1/data/${policy}`,
				{
					input: question,
				},
			);

			return response.data.result && response.data.result.allow;
		} catch (error) {
			Logger.error(
				`${this.mConnection}/v1/data/${policy}`,
				question,
				error,
			);
			return false;
		}
	}

	public async GetUserId(metadata: Metadata): Promise<string> {
		const token = (metadata.get("token")[0] as string).split(" ")[1];
		const info = await JsonWebToken.Verify(token);

		return info.subject!.accountId;
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
}

export default AuthorizationManager;
