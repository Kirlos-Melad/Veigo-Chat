import MessageDto, {
	UpdateRequestSerialized,
} from "@source/application/dtos/message";
import AuthorizationManager from "@source/application/utilities/AuthorizationManager";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import MessageRepository from "@source/infrastructure/database/repositories/Message.repository";
import { UpdateRequest } from "@source/types/generated/protos/message/UpdateRequest";

const repository = new MessageRepository();

const Serializer = (data: UpdateRequest) => MessageDto.Update(data);

const Authorize = async (requesterId: string, data: UpdateRequestSerialized) =>
	await AuthorizationManager.instance.CanEditMessage({
		userId: requesterId,
		roomId: data.roomId,
		messageId: data.messageId,
	});

const Handle = async (
	connection: DatabaseClient,
	data: UpdateRequestSerialized & { requesterId: string },
) => {
	return await repository.Update(
		connection,
		{ id: data.messageId },
		{ content: data.content },
	);
};

export default {
	Serializer,
	Authorize,
	Handle,
};
