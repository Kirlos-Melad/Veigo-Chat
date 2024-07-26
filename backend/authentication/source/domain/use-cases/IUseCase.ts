import grpc from "@grpc/grpc-js";

import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";

interface IUseCase<TInput, USerialized, KOutput> {
    serialize: (data: TInput) => USerialized;

    authorize: (
        metadata: grpc.Metadata,
        data: USerialized,
    ) => Promise<string | boolean>;

    handle: (
        connection: DatabaseClient,
        data: USerialized & { requesterId?: string },
    ) => Promise<KOutput>;
}

export type { IUseCase };
