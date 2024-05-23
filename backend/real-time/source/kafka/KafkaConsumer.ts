import { Consumer, Kafka, KafkaMessage, EachMessagePayload } from "kafkajs";
import path from "path";

import AbsolutePath from "../utilities/AbsolutePath";
import EventEmitter from "../types/EventEmitter";

type Configurations = {
	groupId: string;
	clientId: string;
	brokers: string[];
};

type KafkaEvents = {
	CHAT_MESSAGE: [message: KafkaMessage];
};

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
			topics: ["CHAT_MESSAGE"],
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
