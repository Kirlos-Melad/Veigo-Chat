import { KafkaMessage } from "kafkajs";
import { z } from "zod";

import { KafkaEvents } from "../KafkaConsumer";
import Logger from "@source/utilities/Logger";
import KafkaEvent from "@root/source/types/KafkaEvent";
import DebeziumMessage from "@root/source/utilities/DebeziumMessage";

interface MemberRoomEntity {
	memberId: string;
	roomId: string;
}

class MembersRoomsChatEvent extends KafkaEvent<
	KafkaEvents,
	"CHAT_DB_PUBLIC_MEMBERS_ROOMS",
	MemberRoomEntity
> {
	public constructor() {
		super(
			"CHAT_DB_PUBLIC_MEMBERS_ROOMS",
			z.object({
				memberId: z.string(),
				roomId: z.string(),
			}),
		);
	}

	private async HandleDelete(data: MemberRoomEntity): Promise<void> {
		Logger.information(`[CHAT_DB_PUBLIC_MEMBERS_ROOMS] DELETED=>`, data);
	}

	public listener = async (message: KafkaMessage) => {
		const debeziumMessage = new DebeziumMessage(
			message.value,
			this.mSchema,
		);
		debeziumMessage.Serialize();

		switch (debeziumMessage.data!.payload.op) {
			case "d":
				await this.HandleDelete(debeziumMessage.data!.payload.before!);
				break;

			default:
				Logger.warning(
					`[CHAT_DB_PUBLIC_MEMBERS_ROOMS]=> Unhandled operation ${
						debeziumMessage.data!.payload.op
					}`,
				);
				break;
		}
	};
}

export default new MembersRoomsChatEvent();
