import { Consumer, Kafka, KafkaMessage, EachMessagePayload } from "kafkajs";
import path from "path";

import AbsolutePath from "../utilities/AbsolutePath";
import EventEmitter from "../types/EventEmitter";

type Configurations = {
	groupId: string;
	clientId: string;
	brokers: string[];
};

type CHAT_DB_PREFIX = "CHAT";
type CHAT_DB_SUFFIX = "MEMBERS_ROOMS" | "MESSAGES";

type KafkaEvents = {
	[K in `${CHAT_DB_PREFIX}_DB_PUBLIC_${CHAT_DB_SUFFIX}`]: [
		message: KafkaMessage,
	];
};
function GetTopic<T extends CHAT_DB_PREFIX, U extends CHAT_DB_SUFFIX>(
	prefix: T,
	suffix: U,
): `${Lowercase<T>}.db.public.${Lowercase<U>}` {
	return `${prefix.toLowerCase()}.db.public.${suffix.toLowerCase()}` as `${Lowercase<T>}.db.public.${Lowercase<U>}`;
}

function TopicToEvent(topic: string): keyof KafkaEvents {
	const chatRegex =
		/^chat\.db\.public\.(profiles|rooms|members_rooms|messages)$/;

	if (chatRegex.test(topic)) {
		const suffix = topic.split(".")[3].toUpperCase() as CHAT_DB_SUFFIX;
		return `CHAT_DB_PUBLIC_${suffix}` as keyof KafkaEvents;
	}

	throw new Error("Invalid topic format");
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
				GetTopic("CHAT", "MEMBERS_ROOMS"),
				GetTopic("CHAT", "MESSAGES"),
			],
			fromBeginning: false,
		});
		await this.mClient.run({
			eachMessage: async (messagePayload: EachMessagePayload) => {
				const { topic, message } = messagePayload;
				this.emit(TopicToEvent(topic), message);
			},
		});
	}

	public async Shutdown(): Promise<void> {
		await this.mClient.disconnect();
	}
}

export default KafkaConsumer;
export type { KafkaEvents };
