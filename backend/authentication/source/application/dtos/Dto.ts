import { ZodType } from "zod";

abstract class Dto<U> {
    protected mRawData: any;
    private mSchema: ZodType<U>;
    private mSerializedData: U | undefined;

    constructor(data: any, schema: ZodType<U>) {
        this.mRawData = data;
        this.mSchema = schema;
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

export { Dto };
