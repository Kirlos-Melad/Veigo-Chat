import MessageDto, {
	UpdateRequestSerialized,
} from "@root/source/application/dtos/message";
import AuthorizationManager from "@root/source/application/utilities/AuthorizationManager";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import MessageRepository from "@root/source/infrastructure/database/repositories/Message.repository";
import { UpdateRequest } from "@root/source/types/generated/protos/message/UpdateRequest";

const repository = new MessageRepository();

const Serializer = (data: UpdateRequest) => MessageDto.Update(data);

const Authorize = async (requesterId: string, data: UpdateRequestSerialized) =>
	await AuthorizationManager.instance.CanEditMessage(
		requesterId,
		data.roomId,
		data.messageId,
	);

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
