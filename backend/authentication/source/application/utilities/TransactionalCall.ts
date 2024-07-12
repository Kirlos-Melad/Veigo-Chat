import grpc, { handleUnaryCall } from "@grpc/grpc-js";

import DatabaseManager, {
	DatabaseClient,
} from "@source/infrastructure/database/DatabaseManager";
import Logger from "@source/application/utilities/Logger";
import ErrorSerializer from "@source/application/utilities/SerializeError";
import { Dto } from "@source/application/dtos/Dto";

type SerializerFunction<T, U> = (data: T) => Dto<U>;

type AuthorizationFunction<T> = (
	metadata: grpc.Metadata,
	data: T,
) => Promise<string | boolean>;

type HandlerFunction<T, U> = (
	connection: DatabaseClient,
	data: T,
) => Promise<U>;

function TransactionalCall<T, U, K>(
	serializer: SerializerFunction<T, U>,
	authorize: AuthorizationFunction<U>,
	handle: HandlerFunction<U & { requesterId?: string }, K>,
): Promisify<handleUnaryCall<T, K>> {
	return async (
		request: grpc.ServerUnaryCall<T, U>,
		respond: grpc.sendUnaryData<K>,
	): Promise<void> => {
		let conn: DatabaseClient | null = null;

		try {
			const _serializer = serializer(request.request);
			_serializer.Serialize();

			const requesterId = await authorize(
				request.metadata,
				_serializer.data!,
			);
			if (!requesterId) throw new Error("Unauthorized action");

			conn = await DatabaseManager.instance.LeaseConnection();
			const result = await handle(conn, {
				..._serializer.data!,
				requesterId:
					typeof requesterId == "string" ? requesterId : undefined,
			});
			await conn.CommitTransaction();
			respond(null, result);
		} catch (error) {
			Logger.error(error);
			await conn?.RollbackTransaction();
			const errorSerializer = new ErrorSerializer(error);
			errorSerializer.Serialize();
			respond({
				name: "Error",
				message: JSON.stringify(errorSerializer.serializedError),
			});
		} finally {
			await conn?.Release();
		}
	};
}

export default TransactionalCall;
export type { SerializerFunction, AuthorizationFunction, HandlerFunction };
