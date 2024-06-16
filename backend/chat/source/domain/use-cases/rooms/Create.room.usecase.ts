import RoomDto, {
	CreateRequestSerialized,
} from "@root/source/application/dtos/room";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import MemberRoomRepository from "@root/source/infrastructure/database/repositories/MemberRoom.repository";
import RoomRepository from "@root/source/infrastructure/database/repositories/Room.repository";
import { CreateRequest } from "@root/source/types/generated/protos/RoomPackage/CreateRequest";
import MemberRoomEntity from "../../entities/MemberRoom.entity";

const roomRepository = new RoomRepository();
const memberRoomRepository = new MemberRoomRepository();

function AddRoomCreatorAsMember(creator: string, members?: string[]) {
	if (!members) return [creator];
	if (!members.includes(creator)) members.push(creator);
	return members;
}

const Serializer = (data: CreateRequest) => RoomDto.Create(data);

//? Anyone can create a room
const Authorize = async () => true;

const Handle = async (
	connection: DatabaseClient,
	data: CreateRequestSerialized & { requesterId: string },
) => {
	const [room, members] = await Promise.all([
		roomRepository.Create(connection, {
			photoPath: data.photoPath,
			name: data.name,
			description: data.description,
			type: data.type,
			privacy: data.privacy!,
		}),
		memberRoomRepository.BulkCreate(connection, {
			roomId: data.name,
			membersId: AddRoomCreatorAsMember(data.requesterId, data.members),
		}),
	]);

	return {
		information: room,
		members: members,
	};
};

export default {
	Serializer,
	Authorize,
	Handle,
};
