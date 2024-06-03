import websocket from "websocket";
import path from "path";
import { z } from "zod";

import AbsolutePath from "@source/utilities/AbsolutePath";
import Logger from "@source/utilities/Logger";
import EventEmitter from "../types/EventEmitter";
import JsonWebToken from "../utilities/JsonWebToken";

type ClientToServer = {
	JOIN_ROOM: [connection: SocketClient, { name: string }];
	LEAVE_ROOM: [connection: SocketClient, { name: string }];
};

type ServerToClient = {
	MESSAGE: [{ type: string; content: any }];
	ERROR: [{ reason: string }];
};

type SocketClientEvents = ClientToServer & ServerToClient;

const ClientToServerSchema = z.object({
	JOIN_ROOM: z.tuple([z.object({ name: z.string() })]),
	LEAVE_ROOM: z.tuple([z.object({ name: z.string() })]),
});

const ServerToClientSchema = z.object({
	MESSAGE: z.tuple([
		z.object({
			type: z.string(),
			content: z.any(),
		}),
	]),
	ERROR: z.tuple([z.object({ reason: z.string() })]),
});

const ParseMessage = (message: string, schema: z.ZodObject<any>) => {
	return z
		.string()
		.transform((value) => {
			try {
				return JSON.parse(value);
			} catch (error) {
				return null;
			}
		})
		.pipe(
			z.object({
				type: z.string(),
				payload: z.array(z.any()),
			}),
		)
		.refine((data) => {
			const { type, payload } = data;
			if (!Object.keys(schema.shape).includes(type)) return false;
			const shape = schema.shape[type];
			return shape.safeParse(payload).success;
		})
		.safeParse(message);
};

class SocketClient extends EventEmitter<SocketClientEvents> {
	private mConnection: websocket.connection;
	private mId: string;

	public constructor(id: string, connection: websocket.connection) {
		super(path.join(AbsolutePath(import.meta.url), "client-events"));

		this.mId = id;

		this.mConnection = connection;
		this.mConnection.on("close", () =>
			Logger.information(`Client[${this.mId}] closed connection`),
		);
		this.mConnection.on("message", (message) => {
			if (message.type === "binary") {
				this.Send("ERROR", {
					reason: "Binary messages are not supported",
				});

				return;
			}

			this.HandleMessage(message.utf8Data);
		});
	}

	private HandleMessage(message: string) {
		const result = ParseMessage(message, ClientToServerSchema);
		if (!result.success) {
			this.Send("ERROR", { reason: result.error.message });

			return;
		}

		//? Should be ok to use any as the validation was success
		this.emit(
			result.data.type as any,
			...([this, ...result.data.payload] as any),
		);
	}

	public get id() {
		return this.mId;
	}

	public get isConnected() {
		return this.mConnection.connected;
	}

	public Send<T extends keyof ServerToClient>(
		type: T,
		...payload: ServerToClient[T]
	) {
		this.mConnection.sendUTF(
			JSON.stringify({ type, payload }),
			(error) => error && Logger.warning(`Failed to send message`, error),
		);
	}
}

class SocketServer extends EventEmitter<{}> {
	private static sInstance: SocketServer;

	private mConnection: websocket.server;
	private mUsers: Record<string, SocketClient[]>; // user, conn[]
	private mClients: Record<string, string>; // conn, user
	private mRooms: Record<string, string[]>; // room, conn[]

	private constructor(configs: websocket.IServerConfig) {
		super(path.join(AbsolutePath(import.meta.url), "server-events"));

		this.mUsers = {};
		this.mClients = {};
		this.mRooms = {};

		this.mConnection = new websocket.server(configs);
		this.mConnection.on("request", async (request) => {
			const token: string = (
				request.resourceURL.query["token"] as string
			).split(" ")[1];

			const { subject: data } = await JsonWebToken.Verify(token);
			const connection = request.accept(null, request.origin);

			const client = new SocketClient(data!.clientId, connection);
			await client.LoadEvents();

			if (!this.mUsers[data!.accountId]) {
				this.mUsers[data!.accountId] = [client];
			} else {
				this.mUsers[data!.accountId].push(client);
			}

			this.mClients[client.id] = data!.accountId;
		});
	}

	public static CreateInstance(configs: websocket.IServerConfig) {
		if (!SocketServer.sInstance)
			SocketServer.sInstance = new SocketServer(configs);

		return SocketServer.sInstance;
	}

	public static get instance() {
		return SocketServer.sInstance;
	}

	public JoinRoom(connection: SocketClient, roomName: string) {
		if (!this.mRooms[roomName]) {
			this.mRooms[roomName] = [connection.id];
		} else {
			this.mRooms[roomName].push(connection.id);
		}
	}

	public LeaveRoom(connection: SocketClient, roomName: string) {
		if (!this.mRooms[roomName]) return;

		this.mRooms[roomName] = this.mRooms[roomName].filter(
			(value) => value !== connection.id,
		);
	}

	public Send(room: string, ...payload: ServerToClient["MESSAGE"]) {
		if (!this.mRooms[room]) return;

		const users = this.mRooms[room];

		for (const user of users) {
			this.mUsers[user].forEach((client) =>
				client.Send("MESSAGE", ...payload),
			);
		}
	}
}

export default SocketServer;
export type { SocketClient, SocketClientEvents };
