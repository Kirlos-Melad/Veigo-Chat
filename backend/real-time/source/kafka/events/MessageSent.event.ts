import { KafkaMessage } from "kafkajs";
import { z } from "zod";

import Logger from "@source/utilities/Logger";
import Event from "@source/types/Event";
import DebeziumMessage from "@source/utilities/DebeziumMessage";
import SocketServer from "@source/websocket/SocketServer";
import { KafkaEvents, KafkaEventsSchema } from "../Schemas";


class MessagesChatEvent extends Event<
	KafkaEvents,
	"MESSAGE_SENT"
> {
	public constructor() {
		super("MESSAGE_SENT");
	}

	public listener = async (data: any) => {
		const result = KafkaEventsSchema.shape["MESSAGE_SENT"].safeParse(data);
		if (!result.success) return;

		result.data.forEach((message) => {
			Logger.information(`[MESSAGE_SENT]=>`, message);

			SocketServer.instance.Broadcast(message.roomId, {
				type: "CHAT_MESSAGE",
				content: message,
			});
		});
	};
}

export default new MessagesChatEvent();
