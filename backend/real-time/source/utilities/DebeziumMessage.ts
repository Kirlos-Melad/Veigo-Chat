import { ZodType, z } from "zod";

type Payload<T> = {
	before?: T | null;
	after?: T | null;
	op: "c" | "r" | "u" | "d" | "t" | "m";
};
const PayloadSchema = <T>(dataSchema: ZodType<T>): ZodType<Payload<T>> =>
	z.object({
		before: dataSchema.nullable().optional(),
		after: dataSchema.nullable().optional(),
		op: z.enum(["c", "r", "u", "d", "t", "m"]),
	});

type Message<T> = {
	payload: Payload<T>;
};
const MessageSchema = <T>(dataSchema: ZodType<T>): ZodType<Message<T>> =>
	z.object({
		schema: z.object({}).passthrough(),
		payload: PayloadSchema(dataSchema),
	});

class DebeziumMessage<T> {
	private mRawData: any;
	private mSchema: ZodType<Message<T>>;
	private mSerializedData: Message<T> | undefined;

	public constructor(data: any, dataSchema: ZodType<T>) {
		this.mRawData = data;
		this.mSchema = MessageSchema(dataSchema);
	}

	public get data() {
		return Object.freeze(this.mSerializedData);
	}

	public Serialize(): void {
		const result = this.mSchema.safeParse(this.mRawData);
		if (result.success) this.mSerializedData = result.data;
		else throw result.error.format();
	}
}

export default DebeziumMessage;
