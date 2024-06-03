import axios from "axios";

import Logger from "./Logger";

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

	public async CanJoinRoom(user: string, room: string): Promise<boolean> {
		return await this.Ask("join_room", {
			roomId: room,
			userId: user,
		});
	}
}

export default AuthorizationManager;
