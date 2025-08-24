import { Kafka, Consumer, EachMessagePayload } from "kafkajs";
import path from "path";
import { z } from "zod";

import AbsolutePath from "../utilities/AbsolutePath";
import EventEmitter from "../types/EventEmitter";
import { KafkaEvents, KafkaEventsSchema } from "./Schemas";

interface ConsumerConfig {
	clientId: string;
	groupId: string;
	brokers: string[];
}

class KafkaConsumer extends EventEmitter<KafkaEvents> {
	private consumer: Consumer;
	private readonly topics: Record<keyof KafkaEvents, string> = {
		MESSAGE_SENT: "MESSAGE_SENT",
		MESSAGE_DELIVERED: "MESSAGE_DELIVERED",
		MESSAGE_READ: "MESSAGE_READ",
		ERROR: "ERROR",
	};

	constructor(config: ConsumerConfig) {
		super(path.join(AbsolutePath(import.meta.url), "events"));

		const kafka = new Kafka({
			clientId: config.clientId,
			brokers: config.brokers,
		});

		this.consumer = kafka.consumer({ groupId: config.groupId });
	}

	public async Start() {
		await this.consumer.connect();

		// Subscribe to all topics in KafkaEvents
		for (const topic of Object.values(this.topics)) {
			await this.consumer.subscribe({ topic, fromBeginning: false });
		}

		await this.consumer.run({
			eachMessage: async ({ topic, message }: EachMessagePayload) => {
				if (!message.value) return;

				const topicKey = (Object.keys(this.topics) as (keyof KafkaEvents)[])
					.find(key => this.topics[key] === topic);

				if (!topicKey) return;

				try {
					const parsed = KafkaEventsSchema.shape[topicKey].parse([JSON.parse(message.value.toString())]);
					this.emit(topicKey, parsed);
				} catch (err) {
					this.emit("ERROR", err instanceof Error ? err : new Error(String(err)));
				}
			}
		});
	}

	public async Shutdown() {
		await this.consumer.disconnect();
	}
}

export default KafkaConsumer;
export type { ConsumerConfig };
