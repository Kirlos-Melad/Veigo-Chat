import { KafkaMessage } from "kafkajs";
import { KafkaEvents } from "../KafkaConsumer";
import Event from "@source/types/Event";
import Logger from "@source/utilities/Logger";
import SocketServer from "@source/websocket/SocketServer";

class ChatMessageEvent extends Event<KafkaEvents, "CHAT_MESSAGE"> {
	public constructor() {
		super("CHAT_MESSAGE");
	}

	public listener = (message: KafkaMessage) => {
		Logger.information(`[CHAT_MESSAGE]=> ${message.key}: ${message.value}`);

		if (!message.value) return;
		const { room, type, content } = JSON.parse(message.value.toString());

		SocketServer.instance.Send(room, {
			type,
			content,
		});
	};
}

export default ChatMessageEvent;
