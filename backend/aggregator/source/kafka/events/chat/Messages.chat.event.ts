import { KafkaMessage } from "kafkajs";
import { z } from "zod";

import { KafkaEvents } from "../../KafkaConsumer";
import Logger from "@source/utilities/Logger";
import KafkaEvent from "@root/source/types/KafkaEvent";
import DebeziumMessage from "@root/source/utilities/DebeziumMessage";
import OwnershipModel from "@root/source/models/Ownership.model";
import MembershipModel from "@root/source/models/Membership.model";

interface MessageEntity {
	id: string;

	roomId: string;
	senderId: string;
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
				id: z.string(),
				roomId: z.string(),
				senderId: z.string(),
			}),
		);
	}

	private async HandleCreate(data: MessageEntity): Promise<void> {
		Logger.information(`[CHAT_DB_PUBLIC_MESSAGES] CREATED=>`, data);
		const messageOwnership = new OwnershipModel({
			type: "message",
			resource: data.id,
			owner: data.senderId,
		});

		const messageMembership = new MembershipModel({
			type: "room-messages",
			resource: data.roomId,
			member: { $addToSet: data.id },
		});

		await Promise.all([messageOwnership.save(), messageMembership.save()]);
	}

	private async HandleDelete(data: MessageEntity): Promise<void> {
		Logger.information(`[CHAT_DB_PUBLIC_MESSAGES] DELETED=>`, data);
		await Promise.all([
			OwnershipModel.deleteOne({
				type: "message",
				resource: data.id,
			})
				.lean()
				.exec(),
			MembershipModel.updateOne(
				{
					type: "room-messages",
					resource: data.roomId,
				},
				{
					$pull: {
						member: data.id,
					},
				},
			),
		]);
	}

	public listener = async (message: KafkaMessage) => {
		try {
			const debeziumMessage = new DebeziumMessage(
				message.value,
				this.mSchema,
			);
			debeziumMessage.Serialize();

			switch (debeziumMessage.data!.payload.op) {
				case "c":
					await this.HandleCreate(
						debeziumMessage.data!.payload.after!,
					);
					break;

				case "d":
					await this.HandleDelete(
						debeziumMessage.data!.payload.before!,
					);
					break;

				default:
					Logger.warning(
						`[CHAT_DB_PUBLIC_MESSAGES]=> Unhandled operation ${
							debeziumMessage.data!.payload.op
						}`,
					);
					break;
			}
		} catch (error) {
			Logger.error(error);
		}
	};
}

export default new MessagesChatEvent();
