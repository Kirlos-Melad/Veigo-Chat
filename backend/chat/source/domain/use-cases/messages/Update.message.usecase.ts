import MessageDto, {
	UpdateRequestSerialized,
} from "@root/source/application/dtos/message";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import MessageRepository from "@root/source/infrastructure/database/repositories/Message.repository";
import { UpdateRequest } from "@root/source/types/generated/protos/MessagePackage/UpdateRequest";

const repository = new MessageRepository();

const Serializer = (data: UpdateRequest) => MessageDto.Update(data);

const Authorize = async (
	requesterId: string,
	data: UpdateRequestSerialized,
) => {
	//TODO: must be in the room and be the sender
	return true;
};

const Handle = async (
	connection: DatabaseClient,
	data: UpdateRequestSerialized & { requesterId: string },
) => {
	return await repository.Update(
		connection,
		{ id: data.id },
		{ content: data.content },
	);
};

export default {
	Serializer,
	Authorize,
	Handle,
};
