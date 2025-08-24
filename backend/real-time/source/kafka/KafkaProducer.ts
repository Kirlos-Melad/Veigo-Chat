import { Kafka, Producer, ProducerRecord, Message } from "kafkajs";
import path from "path";
import { z } from "zod";

import AbsolutePath from "../utilities/AbsolutePath";
import EventEmitter from "../types/EventEmitter";
import { KafkaEvents, KafkaEventsSchema } from "./Schemas";

interface ProducerConfig {
	clientId: string;
	brokers: string[];
}

class KafkaProducer extends EventEmitter<KafkaEvents> {
	private mProducer: Producer;
	private readonly topics: Record<keyof KafkaEvents, string> = {
		MESSAGE_SENT: "MESSAGE_SENT",
		MESSAGE_DELIVERED: "MESSAGE_DELIVERED",
		MESSAGE_READ: "MESSAGE_READ",
		ERROR: "ERROR",
	};

	constructor(config: ProducerConfig) {
		super(path.join(AbsolutePath(import.meta.url), "events"));

		const kafka = new Kafka({
			clientId: config.clientId,
			brokers: config.brokers,
		});

		this.mProducer = kafka.producer({ allowAutoTopicCreation: true, retry: { retries: 3 } });
	}

	public async Start() {
		await this.mProducer.connect();
	}

	public async Shutdown() {
		await this.mProducer.disconnect();
	}

	public async Send<T extends keyof KafkaEvents, S extends z.ZodTypeAny>(
		topic: T,
		messages: z.infer<S>,
	) {
		try {
			const result = KafkaEventsSchema.shape[topic].safeParse(messages);
			if (!result.success) {
				throw new Error(JSON.stringify(result.error.format()));
			}

			const record: ProducerRecord = {
				topic: this.topics[topic],
				messages: result.data.map((message: any) => ({
					key: message.roomId,
					value: JSON.stringify(message),
				}) as Message)
			};

			await this.mProducer.send(record)

			this.emit(topic as any, result.data as any);
		} catch (error) {
			console.error("Error sending Kafka message:", error);
			this.emit("ERROR", error instanceof Error ? error : new Error(String(error)));
		}
	}
}

export default KafkaProducer;
export type { ProducerConfig, KafkaEvents };
