import { KafkaMessage } from "kafkajs";
import { z } from "zod";

import { KafkaEvents } from "../../KafkaConsumer";
import Logger from "@source/utilities/Logger";
import KafkaEvent from "@source/types/KafkaEvent";
import DebeziumMessage from "@source/utilities/DebeziumMessage";
import ConfigurationModel from "@source/models/Configuration.model";

interface DeviceEntity {
	accountId: string;
	clientId: string;

	accessTokenId: string;
	forceRefreshToken: boolean;

	refreshTokenId: string;
	forceSignIn: boolean;
}

class DevicesAuthEvent extends KafkaEvent<
	KafkaEvents,
	"AUTH_DB_PUBLIC_DEVICES",
	DeviceEntity
> {
	public constructor() {
		super(
			"AUTH_DB_PUBLIC_DEVICES",
			z.object({
				accountId: z.string(),
				clientId: z.string(),
				accessTokenId: z.string(),
				forceRefreshToken: z.boolean(),
				refreshTokenId: z.string(),
				forceSignIn: z.boolean(),
			}),
		);
	}

	private async HandleCreate(data: DeviceEntity): Promise<void> {
		Logger.information(`[AUTH_DB_PUBLIC_DEVICES] CREATED=>`, data);
		const deviceSettings = new ConfigurationModel({
			type: "device",
			resource: `${data.accountId}:${data.clientId}`,
			settings: {
				accessTokenId: data.accessTokenId,
				forceRefreshToken: data.forceRefreshToken,
				refreshTokenId: data.refreshTokenId,
				forceSignIn: data.forceSignIn,
			},
		});

		await deviceSettings.save();
	}

	private async HandleUpdate(data: DeviceEntity): Promise<void> {
		Logger.information(`[AUTH_DB_PUBLIC_DEVICES] UPDATED=>`, data);

		await ConfigurationModel.findOneAndUpdate(
			{
				type: "device",
				resource: `${data.accountId}:${data.clientId}`,
			},
			{
				settings: {
					accessTokenId: data.accessTokenId,
					forceRefreshToken: data.forceRefreshToken,
					refreshTokenId: data.refreshTokenId,
					forceSignIn: data.forceSignIn,
				},
			},
			{ upsert: true, new: true },
		)
			.lean()
			.exec();
	}

	private async HandleDelete(data: DeviceEntity): Promise<void> {
		Logger.information(`[AUTH_DB_PUBLIC_DEVICES] DELETED=>`, data);
		await ConfigurationModel.deleteOne({
			type: "device",
			resource: `${data.accountId}:${data.clientId}`,
		})
			.lean()
			.exec();
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

				case "u":
					await this.HandleUpdate(
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
						`[AUTH_DB_PUBLIC_DEVICES]=> Unhandled operation ${
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

export default new DevicesAuthEvent();
