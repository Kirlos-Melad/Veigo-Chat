import { KafkaMessage } from "kafkajs";
import { z } from "zod";

import { KafkaEvents } from "../../KafkaConsumer";
import Logger from "@source/utilities/Logger";
import KafkaEvent from "@root/source/types/KafkaEvent";
import DebeziumMessage from "@root/source/utilities/DebeziumMessage";
import MembershipModel from "@root/source/models/Membership.model";

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

	private async HandleCreate(data: MemberRoomEntity): Promise<void> {
		Logger.information(`[CHAT_DB_PUBLIC_MEMBERS_ROOMS] CREATED=>`, data);
		const userMembership = new MembershipModel({
			type: "room-members",
			resource: data.roomId,
			member: { $addToSet: data.memberId },
		});

		await userMembership.save();
	}

	private async HandleDelete(data: MemberRoomEntity): Promise<void> {
		Logger.information(`[CHAT_DB_PUBLIC_MEMBERS_ROOMS] DELETED=>`, data);
		await MembershipModel.updateOne(
			{
				type: "room-members",
				resource: data.roomId,
			},
			{
				$pull: {
					member: data.memberId,
				},
			},
		);
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
						`[CHAT_DB_PUBLIC_MEMBERS_ROOMS]=> Unhandled operation ${
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

export default new MembersRoomsChatEvent();
