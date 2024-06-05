import RoomDto, {
	ReadRequestSerialized,
} from "@root/source/application/dtos/room";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import RoomRepository from "@root/source/infrastructure/database/repositories/Room.repository";
import { DeleteRequest } from "@root/source/types/generated/protos/RoomPackage/DeleteRequest";

const repository = new RoomRepository();

const Serializer = (data: DeleteRequest) => RoomDto.Read(data);

const Authorize = async (requesterId: string, data: ReadRequestSerialized) => {
	return requesterId != data.id;
};

const Handle = async (
	connection: DatabaseClient,
	data: ReadRequestSerialized & { requesterId: string },
) => {
	return await repository.Delete(connection, {
		id: data.id,
	});
};

export default {
	Serializer,
	Authorize,
	Handle,
};
