import RoomDto, {
	CreateRequestSerialized,
} from "@root/source/application/dtos/room";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import RoomRepository from "@root/source/infrastructure/database/repositories/Room.repository";
import { CreateRequest } from "@root/source/types/generated/protos/RoomPackage/CreateRequest";

const repository = new RoomRepository();

const Serializer = (data: CreateRequest) => RoomDto.Create(data);

const Authorize = async (
	requesterId: string,
	data: CreateRequestSerialized,
) => {
	return true;
};

const Handle = async (
	connection: DatabaseClient,
	data: CreateRequestSerialized & { requesterId: string },
) => {
	return await repository.Create(connection, {
		photoPath: data.photoPath,
		name: data.name,
		description: data.description,
		type: data.type,
		privacy: data.privacy!,
	});
};

export default {
	Serializer,
	Authorize,
	Handle,
};
