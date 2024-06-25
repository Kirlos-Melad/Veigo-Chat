import MessageDto, {
	ListRequestSerialized,
} from "@root/source/application/dtos/message";
import AuthorizationManager from "@root/source/application/utilities/AuthorizationManager";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import MessageRepository from "@root/source/infrastructure/database/repositories/Message.repository";
import { ListRequest } from "@root/source/types/generated/protos/message/ListRequest";

const repository = new MessageRepository();

const Serializer = (data: ListRequest) => MessageDto.List(data);

const Authorize = async (requesterId: string, data: ListRequestSerialized) =>
	await AuthorizationManager.instance.CanReadRoom({
		userId: requesterId,
		roomId: data.roomId,
	});

const Handle = async (
	connection: DatabaseClient,
	data: ListRequestSerialized & { requesterId: string },
) => {
	const messages = await repository.List(connection, {
		roomId: data.roomId,
		from: data.page.cursor,
		limit: data.page.size! + 1,
	});

	const hasNext = messages.length > data.page.size!;
	const cursor = hasNext ? messages.pop()!.id : undefined;

	return {
		records: messages,
		metadata: {
			cursor: cursor,
			hasNext: hasNext,
		},
	};
};

export default {
	Serializer,
	Authorize,
	Handle,
};
