import { Kafka, Producer, ProducerRecord } from "kafkajs";

interface Message {
	room: string;
	type: "MESSAGE" | "EVENT";
	content: any;
}

class KafkaProducer {
	private static sInstance: KafkaProducer;

	private mClient: Producer;

	private constructor(clientId: string, brokers: string[]) {
		this.mClient = this.InitializeProducer(clientId, brokers);
	}

	public static CreateInstance(
		clientId: string,
		brokers: string[],
	): KafkaProducer {
		if (!KafkaProducer.sInstance) {
			KafkaProducer.sInstance = new KafkaProducer(clientId, brokers);
		}

		return KafkaProducer.sInstance;
	}

	public static get instance(): KafkaProducer {
		return KafkaProducer.sInstance;
	}

	private InitializeProducer(clientId: string, brokers: string[]) {
		const kafka = new Kafka({
			clientId: clientId,
			brokers: brokers,
		});

		return kafka.producer();
	}

	public async Start(): Promise<void> {
		try {
			await this.mClient.connect();
		} catch (error) {
			console.log("Error connecting the producer: ", error);
		}
	}

	public async Shutdown(): Promise<void> {
		await this.mClient.disconnect();
	}

	public async Send(message: Message): Promise<void> {
		const record: ProducerRecord = {
			topic: "CHAT_MESSAGE",
			messages: [{ value: JSON.stringify(message) }],
		};

		await this.mClient.send(record);
	}
}

export default KafkaProducer;
