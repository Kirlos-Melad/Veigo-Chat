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
		let token: string | null;
		try {
			token = metadata.get("token")[0].toString();
		} catch (error) {
			Logger.error(error);
			throw new Error("Unauthorized action");
		}

		const { subject } = await JsonWebToken.Verify(token);

		const isTokenValid = await this.IsTokenValid({
			subject: JsonWebToken.NormalizeSubject(subject!),
		});

		if (!isTokenValid) {
			throw new Error("Unauthorized action");
		}

		return subject!.accountId;
	}

	private async Ask(args: { policy: string; input: any }): Promise<boolean> {
		const { policy, input } = args;
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

	private async IsTokenValid(args: { subject: string }): Promise<boolean> {
		return await this.Ask({
			policy: "use_access_token",
			input: { subject: args.subject },
		});
	}

	public async CanReadRoom(args: {
		roomId: string;
		userId: string;
	}): Promise<boolean> {
		return await this.Ask({
			policy: "read_room",
			input: args,
		});
	}

	public async CanEditRoom(args: {
		roomId: string;
		userId: string;
	}): Promise<boolean> {
		return await this.Ask({
			policy: "edit_room",
			input: args,
		});
	}

	public async CanSendMessage(args: {
		roomId: string;
		userId: string;
	}): Promise<boolean> {
		return await this.Ask({
			policy: "send_message",
			input: args,
		});
	}

	public async CanEditMessage(args: {
		userId: string;
		roomId: string;
		messageId: string;
	}): Promise<boolean> {
		return await this.Ask({
			policy: "edit_message",
			input: args,
		});
	}
}

export default AuthorizationManager;
