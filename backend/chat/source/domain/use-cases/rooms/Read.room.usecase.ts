import RoomDto, {
	ReadRequestSerialized,
} from "@root/source/application/dtos/room";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import RoomRepository from "@root/source/infrastructure/database/repositories/Room.repository";
import { ReadRequest } from "@root/source/types/generated/protos/RoomPackage/ReadRequest";

const repository = new RoomRepository();

const Serializer = (data: ReadRequest) => RoomDto.Read(data);

const Authorize = async (requesterId: string, data: ReadRequestSerialized) => {
	// tODO: can read if member or (public & group)
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
