import RoomDto, {
	ReadRequestSerialized,
} from "@root/source/application/dtos/room";
import AuthorizationManager from "@root/source/application/utilities/AuthorizationManager";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import MemberRoomRepository from "@root/source/infrastructure/database/repositories/MemberRoom.repository";
import RoomRepository from "@root/source/infrastructure/database/repositories/Room.repository";
import { ReadRequest } from "@root/source/types/generated/protos/RoomPackage/ReadRequest";

const roomRepository = new RoomRepository();
const memberRoomRepository = new MemberRoomRepository();

const Serializer = (data: ReadRequest) => RoomDto.Read(data);

const Authorize = async (requesterId: string, data: ReadRequestSerialized) =>
	await AuthorizationManager.instance.CanReadRoom(requesterId, data.id);

const Handle = async (
	connection: DatabaseClient,
	data: ReadRequestSerialized & { requesterId: string },
) => {
	const [information, members] = await Promise.all([
		roomRepository.Read(connection, {
			id: data.id,
		}),
		memberRoomRepository.Read(connection, {
			roomId: data.id,
		}),
	]);

	return { information, members };
};

export default {
	Serializer,
	Authorize,
	Handle,
};
