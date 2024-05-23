import websocket from "websocket";
import path from "path";
import { z } from "zod";

import AbsolutePath from "@source/utilities/AbsolutePath";
import Logger from "@source/utilities/Logger";
import EventEmitter from "../types/EventEmitter";

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

	public constructor(connection: websocket.connection) {
		super(path.join(AbsolutePath(import.meta.url), "events"));

		//TODO: Change this!
		this.mId = connection.remoteAddress;

		this.mConnection = connection;
		this.mConnection.on("close", () =>
			Logger.information(
				`Client[${this.mConnection.remoteAddress}] closed connection`,
			),
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
	private mRooms: Record<string, string[]>; // room, users[]

	private constructor(configs: websocket.IServerConfig) {
		super(path.join(AbsolutePath(import.meta.url), "events"));

		this.mUsers = {};
		this.mRooms = {};

		this.mConnection = new websocket.server(configs);
		this.mConnection.on("request", async (request) => {
			//TODO: don't accept all
			request.accept(null, request.origin);
		});
		this.mConnection.on("connect", async (connection) => {
			const client = new SocketClient(connection);
			await client.LoadEvents();

			// ? The user can have multiple devices/connections
			if (!this.mUsers[client.id]) {
				this.mUsers[client.id] = [client];
			} else {
				this.mUsers[client.id].push(client);
			}

			Logger.information(`Client[${client.id}] started new connection`);
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
