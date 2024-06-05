import grpc, { Metadata, handleUnaryCall } from "@grpc/grpc-js";

import DatabaseManager, {
	DatabaseClient,
} from "@source/infrastructure/database/DatabaseManager";
import Logger from "./Logger";
import ErrorSerializer from "./SerializeError";
import { Dto } from "../dtos/Dto";
import AuthorizationManager from "./AuthorizationManager";

type SerializerFunction<T, U> = (data: T) => Dto<U>;

type AuthorizationFunction<T> = (
	requesterId: string,
	data: T,
) => Promise<boolean>;

type HandlerFunction<T, U> = (
	connection: DatabaseClient,
	data: T,
) => Promise<U>;

function TransactionalCall<T, U, K>(
	serializer: SerializerFunction<T, U>,
	authorize: AuthorizationFunction<U>,
	handle: HandlerFunction<U & { requesterId: string }, K>,
): handleUnaryCall<T, K> {
	return async (
		request: grpc.ServerUnaryCall<T, U>,
		respond: grpc.sendUnaryData<K>,
	) => {
		let conn: DatabaseClient | null = null;

		try {
			const requesterId = await AuthorizationManager.instance.GetUserId(
				request.metadata,
			);
			const _serializer = serializer(request.request);
			_serializer.Serialize();
			if (!(await authorize(requesterId, _serializer.data!)))
				throw new Error("Unauthorized action");

			conn = await DatabaseManager.instance.LeaseConnection();
			const result = await handle(conn, {
				..._serializer.data!,
				requesterId,
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
