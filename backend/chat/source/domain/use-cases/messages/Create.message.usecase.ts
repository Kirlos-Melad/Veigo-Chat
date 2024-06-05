import MessageDto, {
	CreateRequestSerialized,
} from "@root/source/application/dtos/message";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import MessageRepository from "@root/source/infrastructure/database/repositories/Message.repository";
import { CreateRequest } from "@root/source/types/generated/protos/MessagePackage/CreateRequest";

const repository = new MessageRepository();

const Serializer = (data: CreateRequest) => MessageDto.Create(data);

const Authorize = async (
	requesterId: string,
	data: CreateRequestSerialized,
) => {
	//TODO: can create if member
	return true;
};

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
