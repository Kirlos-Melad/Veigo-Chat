import { KafkaMessage } from "kafkajs";
import { z } from "zod";

import { KafkaEvents } from "../../KafkaConsumer";
import Logger from "@source/utilities/Logger";
import KafkaEvent from "@root/source/types/KafkaEvent";
import DebeziumMessage from "@root/source/utilities/DebeziumMessage";
import ConfigurationModel from "@root/source/models/Configuration.model";

const RoomTypeOptionSchema = z.enum(["direct", "group"]);
type RoomTypeOption = z.infer<typeof RoomTypeOptionSchema>;

const RoomPrivacyOptionSchema = z.enum(["public", "private"]);
type RoomPrivacyOption = z.infer<typeof RoomPrivacyOptionSchema>;

interface RoomEntity {
	id: string;

	type: RoomTypeOption;
	privacy: RoomPrivacyOption;
}

class RoomsChatEvent extends KafkaEvent<
	KafkaEvents,
	"CHAT_DB_PUBLIC_ROOMS",
	RoomEntity
> {
	public constructor() {
		super(
			"CHAT_DB_PUBLIC_ROOMS",
			z.object({
				id: z.string(),
				type: RoomTypeOptionSchema,
				privacy: RoomPrivacyOptionSchema,
			}),
		);
	}

	private async HandleCreate(data: RoomEntity): Promise<void> {
		Logger.information(`[CHAT_DB_PUBLIC_ROOMS] CREATED=>`, data);
		const roomConfigurations = new ConfigurationModel({
			type: "room",
			resource: data.id,
			settings: {
				type: data.type,
				privacy: data.privacy,
			},
		});

		await roomConfigurations.save();
	}

	private async HandleDelete(data: RoomEntity): Promise<void> {
		Logger.information(`[CHAT_DB_PUBLIC_ROOMS] DELETED=>`, data);
		const roomConfigurations = new ConfigurationModel({
			type: "room",
			resource: data.id,
			settings: {
				type: data.type,
				privacy: data.privacy,
			},
		});

		await roomConfigurations.save();
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
						`[CHAT_DB_PUBLIC_ROOMS]=> Unhandled operation ${
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

export default new RoomsChatEvent();
