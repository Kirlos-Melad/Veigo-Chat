import { Consumer, Kafka, KafkaMessage, EachMessagePayload } from "kafkajs";
import path from "path";

import AbsolutePath from "@source/utilities/AbsolutePath";
import EventEmitter from "@source/types/EventEmitter";

type Configurations = {
	groupId: string;
	clientId: string;
	brokers: string[];
};

type AUTH_DB_PREFIX = "AUTH";
type AUTH_DB_SUFFIX = "USERS" | "DEVICES" | "OTP";
type CHAT_DB_PREFIX = "CHAT";
type CHAT_DB_SUFFIX = "PROFILES" | "ROOMS" | "MEMBERS_ROOMS" | "MESSAGES";
function AuthTopicGuard(args: { first: any; second: any }): args is {
	first: AUTH_DB_PREFIX;
	second: AUTH_DB_SUFFIX;
} {
	return (
		args.first === "AUTH" &&
		(args.second === "USERS" ||
			args.second === "DEVICES" ||
			args.second === "OTP")
	);
}

function ChatTopicGuard(args: { first: any; second: any }): args is {
	first: CHAT_DB_PREFIX;
	second: CHAT_DB_SUFFIX;
} {
	return (
		args.first === "CHAT" &&
		(args.second === "PROFILES" ||
			args.second === "ROOMS" ||
			args.second === "MEMBERS_ROOMS" ||
			args.second === "MESSAGES")
	);
}

type KafkaEvents = {
	[K in `${AUTH_DB_PREFIX}_DB_PUBLIC_${AUTH_DB_SUFFIX}`]: [
		message: KafkaMessage,
	];
} & {
	[K in `${CHAT_DB_PREFIX}_DB_PUBLIC_${CHAT_DB_SUFFIX}`]: [
		message: KafkaMessage,
	];
};

function GetTopic<T extends AUTH_DB_PREFIX, U extends AUTH_DB_SUFFIX>(
	prefix: T,
	suffix: U,
): `${Lowercase<T>}.db.public.${Lowercase<U>}`;
function GetTopic<T extends CHAT_DB_PREFIX, U extends CHAT_DB_SUFFIX>(
	prefix: T,
	suffix: U,
): `${Lowercase<T>}.db.public.${Lowercase<U>}`;

function GetTopic<
	T extends AUTH_DB_PREFIX | CHAT_DB_PREFIX,
	U extends AUTH_DB_SUFFIX | CHAT_DB_SUFFIX,
>(prefix: T, suffix: U): `${Lowercase<T>}.db.public.${Lowercase<U>}` {
	if (
		!(
			AuthTopicGuard({ first: prefix, second: suffix }) ||
			ChatTopicGuard({ first: prefix, second: suffix })
		)
	)
		throw new Error("Not a correct suffix/prefix for a topic");

	return `${prefix.toLowerCase()}.db.public.${suffix.toLowerCase()}` as `${Lowercase<T>}.db.public.${Lowercase<U>}`;
}



class KafkaConsumer extends EventEmitter<KafkaEvents> {
	private mClient: Consumer;

	public constructor(configs: Configurations) {
		super(path.join(AbsolutePath(import.meta.url), "events"));

		const { groupId, clientId, brokers } = configs;

		this.mClient = this.InitializeConsumer(groupId, clientId, brokers);
	}

	private InitializeConsumer(
		groupId: string,
		clientId: string,
		brokers: string[],
	): Consumer {
		const kafka = new Kafka({
			clientId: clientId,
			brokers: brokers,
		});
		const consumer = kafka.consumer({ groupId: groupId });
		return consumer;
	}

	public async Start(): Promise<void> {
		await this.mClient.connect();
		await this.mClient.subscribe({
			topics: [
				GetTopic("AUTH", "USERS"),
				GetTopic("AUTH", "DEVICES"),
				GetTopic("AUTH", "OTP"),
				GetTopic("CHAT", "PROFILES"),
				GetTopic("CHAT", "ROOMS"),
				GetTopic("CHAT", "MEMBERS_ROOMS"),
				GetTopic("CHAT", "MESSAGES"),
			],
			fromBeginning: false,
		});
		await this.mClient.run({
			eachMessage: async (messagePayload: EachMessagePayload) => {
				const { topic, message } = messagePayload;
				this.emit(topic as keyof KafkaEvents, message);
			},
		});
	}

	public async Shutdown(): Promise<void> {
		await this.mClient.disconnect();
	}
}

export default KafkaConsumer;
export type { KafkaEvents };
