import { ZodType } from "zod";

abstract class Dto<U> {
    private _schema: ZodType<U>;

    public constructor(schema: ZodType<U>) {
        this._schema = schema;
    }

    public serialize(data: unknown): U {
        const result = this._schema.safeParse(data);
        if (result.success) return result.data;
        //TODO: maybe better?
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        else throw result.error.format();
    }
}

export { Dto };
