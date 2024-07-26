import grpc, { handleUnaryCall } from "@grpc/grpc-js";

import {
    DatabaseManager,
    DatabaseClient,
} from "@source/infrastructure/database/DatabaseManager";
import { Logger } from "@source/application/utilities/Logger";
import { ErrorSerializer } from "@source/application/utilities/SerializeError";
import { IUseCase } from "@source/domain/use-cases/IUseCase";
import { Promisify } from "@source/types/Promisify";

function transactionalCall<T, U, K>(
    useCase: IUseCase<T, U, K>,
): Promisify<handleUnaryCall<T, K>> {
    return async (
        request: grpc.ServerUnaryCall<T, K>,
        respond: grpc.sendUnaryData<K>,
    ): Promise<void> => {
        const logger = Logger.instance;
        let conn: DatabaseClient | null = null;

        try {
            const data = useCase.serialize(request.request);

            const requesterId = await useCase.authorize(request.metadata, data);
            if (!requesterId) throw new Error("Unauthorized action");

            conn = await DatabaseManager.instance.leaseConnection();
            const result = await useCase.handle(conn, {
                ...data,
                requesterId:
                    typeof requesterId == "string" ? requesterId : undefined,
            });
            await conn.commitTransaction();
            respond(null, result);
        } catch (error) {
            logger.error(error);
            await conn?.rollbackTransaction();
            respond({
                name: "Error",
                message: JSON.stringify(new ErrorSerializer().serialize(error)),
            });
        } finally {
            await conn?.release();
        }
    };
}

export { transactionalCall };
