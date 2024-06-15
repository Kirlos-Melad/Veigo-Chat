import MessageDto, {
	ReadRequestSerialized,
} from "@root/source/application/dtos/message";
import AuthorizationManager from "@root/source/application/utilities/AuthorizationManager";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import MessageRepository from "@root/source/infrastructure/database/repositories/Message.repository";
import { ReadRequest } from "@root/source/types/generated/protos/MessagePackage/ReadRequest";

const repository = new MessageRepository();

const Serializer = (data: ReadRequest) => MessageDto.Read(data);

const Authorize = async (requesterId: string, data: ReadRequestSerialized) =>
	await AuthorizationManager.instance.CanReadRoom(requesterId, data.roomId);

const Handle = async (
	connection: DatabaseClient,
	data: ReadRequestSerialized & { requesterId: string },
) => {
	return {
		messages: await repository.ReadBulk(connection, {
			roomId: data.roomId,
		}),
	};
};

export default {
	Serializer,
	Authorize,
	Handle,
};
