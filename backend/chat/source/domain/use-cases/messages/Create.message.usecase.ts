import MessageDto, {
	CreateRequestSerialized,
} from "@root/source/application/dtos/message";
import AuthorizationManager from "@root/source/application/utilities/AuthorizationManager";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import MessageRepository from "@root/source/infrastructure/database/repositories/Message.repository";
import { CreateRequest } from "@root/source/types/generated/protos/message/CreateRequest";

const repository = new MessageRepository();

const Serializer = (data: CreateRequest) => MessageDto.Create(data);

const Authorize = async (requesterId: string, data: CreateRequestSerialized) =>
	await AuthorizationManager.instance.CanSendMessage(
		data.roomId,
		requesterId,
	);

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
