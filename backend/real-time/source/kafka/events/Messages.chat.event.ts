import { KafkaMessage } from "kafkajs";
import { z } from "zod";

import { KafkaEvents } from "@source/kafka/KafkaConsumer";
import Logger from "@source/utilities/Logger";
import KafkaEvent from "@root/source/types/KafkaEvent";
import DebeziumMessage from "@root/source/utilities/DebeziumMessage";
import SocketServer from "@root/source/websocket/SocketServer";

interface MessageEntity {
	roomId: string;
	senderId: string;
	content: string;
}

class MessagesChatEvent extends KafkaEvent<
	KafkaEvents,
	"CHAT_DB_PUBLIC_MESSAGES",
	MessageEntity
> {
	public constructor() {
		super(
			"CHAT_DB_PUBLIC_MESSAGES",
			z.object({
				roomId: z.string(),
				senderId: z.string(),
				content: z.string(),
			}),
		);
	}

	private async HandleCreate(data: MessageEntity): Promise<void> {
		Logger.information(`[CHAT_DB_PUBLIC_MESSAGES] CREATED=>`, data);

		SocketServer.instance.Send(data.roomId, {
			type: "message",
			content: {
				senderId: data.senderId,
				content: data.content,
			},
		});
	}

	public listener = async (message: KafkaMessage) => {
		const debeziumMessage = new DebeziumMessage(
			message.value,
			this.mSchema,
		);
		debeziumMessage.Serialize();

		switch (debeziumMessage.data!.payload.op) {
			case "c":
				await this.HandleCreate(debeziumMessage.data!.payload.after!);
				break;

			default:
				Logger.warning(
					`[CHAT_DB_PUBLIC_MESSAGES]=> Unhandled operation ${
						debeziumMessage.data!.payload.op
					}`,
				);
				break;
		}
	};
}

export default new MessagesChatEvent();
