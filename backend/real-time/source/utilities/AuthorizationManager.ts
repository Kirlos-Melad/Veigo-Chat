import axios from "axios";

import Logger from "./Logger";
import JsonWebToken, { Subject } from "./JsonWebToken";

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

	public async GetUserId(auth: string): Promise<Subject> {
		const token: string = auth.split(" ")[1];

		const { subject } = await JsonWebToken.Verify(token);

		const isTokenValid = await this.IsTokenValid(
			JsonWebToken.NormalizeSubject(subject!),
		);

		if (!isTokenValid) {
			throw new Error("Unauthorized action");
		}

		return subject!;
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

	private async IsTokenValid(subject: string): Promise<boolean> {
		return await this.Ask("use_token", { subject: subject });
	}

	public async CanJoinRoom(user: string, room: string): Promise<boolean> {
		return await this.Ask("join_room", {
			roomId: room,
			userId: user,
		});
	}
}

export default AuthorizationManager;
