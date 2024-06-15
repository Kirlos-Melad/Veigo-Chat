import MessageDto, {
	DeleteRequestSerialized,
} from "@root/source/application/dtos/message";
import AuthorizationManager from "@root/source/application/utilities/AuthorizationManager";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import MessageRepository from "@root/source/infrastructure/database/repositories/Message.repository";
import { DeleteRequest } from "@root/source/types/generated/protos/MessagePackage/DeleteRequest";

const repository = new MessageRepository();

const Serializer = (data: DeleteRequest) => MessageDto.Delete(data);

const Authorize = async (requesterId: string, data: DeleteRequestSerialized) =>
	await AuthorizationManager.instance.CanEditMessage(
		requesterId,
		data.roomId,
		data.messageId,
	);

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
