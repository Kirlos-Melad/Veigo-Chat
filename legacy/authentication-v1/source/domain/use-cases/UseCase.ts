import grpc from "@grpc/grpc-js";
import { ZodType } from "zod";

import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";

abstract class UseCase<Input, Dto, OutPut> {
    private _schema: ZodType<Dto>;

    public constructor(schema: ZodType<Dto>) {
        this._schema = schema;
    }

    public serialize(data: Input): Dto {
        const result = this._schema.safeParse(data);
        if (result.success) return result.data;
        //TODO: maybe better?
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        else throw result.error.format();
    }

    public abstract authorize(
        metadata: grpc.Metadata,
        data: Dto,
    ): Promise<string | boolean>;

    public abstract handle(
        connection: DatabaseClient,
        data: Dto & { requesterId?: string },
    ): Promise<OutPut>;
}

export { UseCase };
