import MessageDto, {
	DeleteRequestSerialized,
} from "@source/application/dtos/message";
import AuthorizationManager from "@source/application/utilities/AuthorizationManager";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import MessageRepository from "@source/infrastructure/database/repositories/Message.repository";
import { DeleteRequest } from "@source/types/generated/protos/message/DeleteRequest";

const repository = new MessageRepository();

const Serializer = (data: DeleteRequest) => MessageDto.Delete(data);

const Authorize = async (requesterId: string, data: DeleteRequestSerialized) =>
	await AuthorizationManager.instance.CanEditMessage({
		userId: requesterId,
		roomId: data.roomId,
		messageId: data.messageId,
	});

const Handle = async (
	connection: DatabaseClient,
	data: DeleteRequestSerialized & { requesterId: string },
) => {
	return await repository.Delete(connection, {
		id: data.messageId,
	});
};

export default {
	Serializer,
	Authorize,
	Handle,
};
