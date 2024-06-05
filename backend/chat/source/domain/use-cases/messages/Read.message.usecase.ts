import MessageDto, {
	ReadRequestSerialized,
} from "@root/source/application/dtos/message";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import MessageRepository from "@root/source/infrastructure/database/repositories/Message.repository";
import { ReadRequest } from "@root/source/types/generated/protos/MessagePackage/ReadRequest";

const repository = new MessageRepository();

const Serializer = (data: ReadRequest) => MessageDto.Read(data);

const Authorize = async (requesterId: string, data: ReadRequestSerialized) => {
	//TODO: must be in the room and be the sender
	return true;
};

const Handle = async (
	connection: DatabaseClient,
	data: ReadRequestSerialized & { requesterId: string },
) => {
	return await repository.Read(connection, {
		id: data.id,
	});
};

export default {
	Serializer,
	Authorize,
	Handle,
};
