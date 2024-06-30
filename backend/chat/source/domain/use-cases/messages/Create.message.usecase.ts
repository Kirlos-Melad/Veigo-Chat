import MessageDto, {
	CreateRequestSerialized,
} from "@source/application/dtos/message";
import AuthorizationManager from "@source/application/utilities/AuthorizationManager";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import MessageRepository from "@source/infrastructure/database/repositories/Message.repository";
import { CreateRequest } from "@source/types/generated/protos/message/CreateRequest";

const repository = new MessageRepository();

const Serializer = (data: CreateRequest) => MessageDto.Create(data);

const Authorize = async (requesterId: string, data: CreateRequestSerialized) =>
	await AuthorizationManager.instance.CanSendMessage({
		roomId: data.roomId,
		userId: requesterId,
	});

const Handle = async (
	connection: DatabaseClient,
	data: CreateRequestSerialized & { requesterId: string },
) => {
	return await repository.Create(connection, {
		senderId: data.requesterId,
		roomId: data.roomId,
		content: data.content,
	});
};

export default {
	Serializer,
	Authorize,
	Handle,
};
