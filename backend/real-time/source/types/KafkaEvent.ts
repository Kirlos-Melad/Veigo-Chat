import { ZodType } from "zod";
import Event from "./Event";

abstract class KafkaEvent<
	T extends Record<string, any[]>,
	U extends keyof T = keyof T,
	K extends any = any,
> extends Event<T, U> {
	protected mSchema: ZodType<K>;

	public constructor(name: U, schema: ZodType<K>) {
		super(name);
		this.mSchema = schema;
	}
}

export default KafkaEvent;
