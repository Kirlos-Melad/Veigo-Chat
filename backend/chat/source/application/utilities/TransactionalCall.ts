import grpc, { handleUnaryCall } from "@grpc/grpc-js";

import DatabaseManager, {
	DatabaseClient,
} from "@source/infrastructure/database/DatabaseManager";
import Logger from "./Logger";
import KafkaProducer from "@source/infrastructure/kafka/KafkaProducer";
import MessageEntity from "@source/domain/entities/Message.entity";

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
			try {
				if (request.getPath().endsWith("Message/Create")) {
					KafkaProducer.instance.Send({
						room: (result as MessageEntity).roomId,
						type: "MESSAGE",
						content: (result as MessageEntity).content,
					});
				}
			} catch (error) {
				Logger.error(error);
			} finally {
				respond(null, result);
			}
		}

		conn.Release();
	};
}

export default TransactionalCall;
export type { HandlerResult };
