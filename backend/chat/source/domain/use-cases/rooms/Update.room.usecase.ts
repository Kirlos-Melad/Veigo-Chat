import RoomDto, {
	UpdateRequestSerialized,
} from "@root/source/application/dtos/room";
import AuthorizationManager from "@root/source/application/utilities/AuthorizationManager";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import RoomRepository from "@root/source/infrastructure/database/repositories/Room.repository";
import { UpdateRequest } from "@root/source/types/generated/protos/room/UpdateRequest";

const repository = new RoomRepository();

const Serializer = (data: UpdateRequest) => RoomDto.Update(data);

const Authorize = async (requesterId: string, data: UpdateRequestSerialized) =>
	await AuthorizationManager.instance.CanEditRoom({
		userId: requesterId,
		roomId: data.id,
	});

const Handle = async (
	connection: DatabaseClient,
	data: UpdateRequestSerialized & { requesterId: string },
) => {
	return await repository.Update(
		connection,
		{
			id: data.id,
		},
		{
			photoPath: data.photoPath,
			name: data.name,
			description: data.description,
			privacy: data.privacy,
		},
	);
};

export default {
	Serializer,
	Authorize,
	Handle,
};
