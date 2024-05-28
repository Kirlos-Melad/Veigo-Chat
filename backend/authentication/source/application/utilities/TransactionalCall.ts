import grpc, { handleUnaryCall } from "@grpc/grpc-js";

import DatabaseManager, {
	DatabaseClient,
} from "@source/infrastructure/database/DatabaseManager";
import Logger from "./Logger";

type HandlerResult<T> = { error: any | null; result: T | null };
type HandlerFunction<T, U> = (
	connection: DatabaseClient,
	data: T,
) => Promise<HandlerResult<U>>;

function TransactionalCall<T, U>(
	fn: HandlerFunction<T, U>,
): handleUnaryCall<T, U> {
	return async (
		request: grpc.ServerUnaryCall<T, U>,
		respond: grpc.sendUnaryData<U>,
	) => {
		const conn = await DatabaseManager.instance.LeaseConnection();
		const { error, result } = await fn(conn, request.request);
		if (error) {
			await conn.RollbackTransaction();
			Logger.error(error);
			respond({
				name: "Error",
				message: JSON.stringify(error),
			});
		} else {
			await conn.CommitTransaction();
			respond(null, result);
		}

		conn.Release();
	};
}

export default TransactionalCall;
export type { HandlerResult };
