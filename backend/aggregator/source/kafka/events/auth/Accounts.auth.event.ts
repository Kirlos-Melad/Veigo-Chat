import { KafkaMessage } from "kafkajs";
import { z } from "zod";

import { KafkaEvents } from "../../KafkaConsumer";
import Logger from "@source/utilities/Logger";
import DebeziumMessage from "@source/utilities/DebeziumMessage";
import KafkaEvent from "@source/types/KafkaEvent";
import ConfigurationModel from "@source/models/Configuration.model";

interface AccountEntity {
	id: string;

	isEmailVerified: boolean;
	isPhoneVerified: boolean;
}

class AccountsAuthEvent extends KafkaEvent<
	KafkaEvents,
	"AUTH_DB_PUBLIC_ACCOUNTS",
	AccountEntity
> {
	public constructor() {
		super(
			"AUTH_DB_PUBLIC_ACCOUNTS",
			z.object({
				id: z.string(),
				isEmailVerified: z.boolean(),
				isPhoneVerified: z.boolean(),
			}),
		);
	}

	private async HandleCreate(data: AccountEntity): Promise<void> {
		Logger.information(`[AUTH_DB_PUBLIC_ACCOUNTS] CREATED=>`, data);
		const accountSettings = new ConfigurationModel({
			type: "account",
			resource: data.id,
			settings: {
				isEmailVerified: data.isEmailVerified,
				isPhoneVerified: data.isPhoneVerified,
			},
		});

		await accountSettings.save();
	}

	private async HandleUpdate(data: AccountEntity): Promise<void> {
		Logger.information(`[AUTH_DB_PUBLIC_ACCOUNTS] UPDATED=>`, data);

		await ConfigurationModel.findOneAndUpdate(
			{
				type: "account",
				resource: data.id,
			},
			{
				settings: {
					isEmailVerified: data.isEmailVerified,
					isPhoneVerified: data.isPhoneVerified,
				},
			},
			{ upsert: true, new: true },
		)
			.lean()
			.exec();
	}

	private async HandleDelete(data: AccountEntity): Promise<void> {
		Logger.information(`[AUTH_DB_PUBLIC_ACCOUNTS] DELETED=>`, data);
		await ConfigurationModel.deleteOne({
			type: "account",
			resource: data.id,
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
						`[AUTH_DB_PUBLIC_ACCOUNTS]=> Unhandled operation ${
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

export default new AccountsAuthEvent();
