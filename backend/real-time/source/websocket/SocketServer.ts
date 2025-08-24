import websocket from "websocket";
import path from "path";
import { z } from "zod";

import AbsolutePath from "@source/utilities/AbsolutePath";
import Logger from "@source/utilities/Logger";
import EventEmitter from "../types/EventEmitter";
import JsonWebToken from "../utilities/JsonWebToken";
import Environments from "../configurations/Environments";
import AuthorizationManager from "../utilities/AuthorizationManager";
import KafkaProducer from "@source/kafka/KafkaProducer";

type ClientToServer = {
	JOIN_ROOM: [connection: SocketClient, { id: string }];
	LEAVE_ROOM: [connection: SocketClient, { id: string }];
	SEND_MESSAGE: [connection: SocketClient, { roomId: string; content: string }];
};

type ServerToClient = {
	MESSAGE: [{ type: string; content: any }];
	ERROR: [{ reason: string }];
};

type SocketClientEvents = ClientToServer & ServerToClient;

const ClientToServerSchema = z.object({
	JOIN_ROOM: z.tuple([z.object({ id: z.string() })]),
	LEAVE_ROOM: z.tuple([z.object({ id: z.string() })]),
	SEND_MESSAGE: z.tuple([
		z.object({ roomId: z.string(), content: z.string() }),
	]),
});

const ServerToClientSchema = z.object({
	MESSAGE: z.tuple([
		z.object({
			type: z.literal("SENT_ACK"),
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
	private mUserId: string;

	public constructor(
		id: string,
		userId: string,
		connection: websocket.connection,
	) {
		super(path.join(AbsolutePath(import.meta.url), "client-events"));

		this.mId = id;
		this.mUserId = userId;

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

	public get userId() {
		return this.mUserId;
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
	private mKafkaProducer: KafkaProducer;

	private mConnection: websocket.server;
	private mClients: Record<string, SocketClient>; // connId, conn
	private mRooms: Record<string, string[]>; // roomId, connId[]

	private constructor(configs: websocket.IServerConfig, kafkaProducer: KafkaProducer) {
		super(path.join(AbsolutePath(import.meta.url), "server-events"));

		this.mClients = {};
		this.mRooms = {};
		this.mKafkaProducer = kafkaProducer;

		this.mConnection = new websocket.server(configs);
		this.mConnection.on("request", async (request) => {
			try {
				// if (request.origin !== Environments.ACCEPTED_ORIGIN) {
				// 	throw new Error("Invalid origin");
				// }

				// const data = await AuthorizationManager.instance.GetUserId(
				// 	request.resourceURL.query["token"] as string,
				// );
				const connection = request.accept(null, request.origin);

				const client = new SocketClient(
					// data.clientId,
					// data.accountId,
					"client-" + Math.random().toString(36).substring(2, 15),
					"account-" + Math.random().toString(36).substring(2, 15),
					connection,
				);
				await client.LoadEvents();

				this.mClients[client.id] = client;
			} catch (error) {
				Logger.error(error);
				return request.reject(401, "Unauthorized");
			}
		});
	}

	public static CreateInstance(configs: websocket.IServerConfig, kafkaProducer: KafkaProducer) {
		if (!SocketServer.sInstance)
			SocketServer.sInstance = new SocketServer(configs, kafkaProducer);

		return SocketServer.sInstance;
	}

	public static get instance() {
		return SocketServer.sInstance;
	}

	public get kafkaProducer() {
		return this.mKafkaProducer;
	}

	public JoinRoom(connection: SocketClient, roomId: string) {
		if (!this.mRooms[roomId]) {
			this.mRooms[roomId] = [connection.id];
		} else {
			this.mRooms[roomId].push(connection.id);
		}
	}

	public LeaveRoom(connection: SocketClient, roomId: string) {
		if (!this.mRooms[roomId]) return;

		this.mRooms[roomId] = this.mRooms[roomId].filter(
			(value) => value !== connection.id,
		);
	}

	public Broadcast(roomId: string, ...payload: ServerToClient["MESSAGE"]) {
		if (!this.mRooms[roomId]) return;

		const clientsId = this.mRooms[roomId];

		for (const cid of clientsId) {
			this.mClients[cid].Send("MESSAGE", ...payload);
		}
	}

	public Multicast(roomId: string, clients: string[], ...payload: ServerToClient["MESSAGE"]) {
		if (!this.mRooms[roomId]) return;

		const clientsId = this.mRooms[roomId];

		for (const cid of clientsId) {
			if (!clients.includes(cid)) continue;

			this.mClients[cid].Send("MESSAGE", ...payload);
		}
	}
}

export default SocketServer;
export type { SocketClient, SocketClientEvents };
