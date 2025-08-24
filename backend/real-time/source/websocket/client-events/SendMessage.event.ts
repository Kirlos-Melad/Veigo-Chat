import Event from "@source/types/Event";
import Logger from "@source/utilities/Logger";
import ServerManager, {
	SocketClient,
	SocketClientEvents,
} from "../SocketServer";
import { KafkaEvents } from "@source/kafka/Schemas";
class ChatMessageEvent extends Event<SocketClientEvents, "SEND_MESSAGE"> {
	public constructor() {
		super("SEND_MESSAGE");
	}

	public listener = async (
		connection: SocketClient,
		data: { roomId: string; content: string },
	) => {
		// if (
		// 	!(await AuthorizationManager.instance.CanJoin(
		// 		connection.userId,
		// 		data.name,
		// 	))
		// )
		// 	return connection.Send("ERROR", {
		// 		reason: `Unauthorized to join ${data.name}`,
		// 	});
		// ServerManager.instance.Send(data.roomId, {
		// 	type: "CHAT_MESSAGE",
		// 	content: {
		// 		sender: connection.userId,
		// 		message: data.content,
		// 		timestamp: new Date().toISOString(),
		// 	},
		// });

		const messages: KafkaEvents["MESSAGE_SENT"] = [{
			messageId: crypto.randomUUID(),
			roomId: data.roomId,
			senderId: connection.userId,
			content: data.content,
			timestamp: new Date().toISOString(),
		}];

		await ServerManager.instance.kafkaProducer.Send("MESSAGE_SENT", messages);

		ServerManager.instance.Multicast(data.roomId, [connection.id], {
			type: "SENT_ACK",
			content: messages,
		});

		Logger.information(
			`[${connection.userId}:${connection.id}]=> Sent message to ${data.roomId}`,
		);
	};
}

export default new ChatMessageEvent();
