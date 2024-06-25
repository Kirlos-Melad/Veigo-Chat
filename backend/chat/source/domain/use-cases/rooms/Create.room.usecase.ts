import RoomDto, {
	CreateRequestSerialized,
} from "@root/source/application/dtos/room";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import MemberRoomRepository from "@root/source/infrastructure/database/repositories/MemberRoom.repository";
import RoomRepository from "@root/source/infrastructure/database/repositories/Room.repository";
import { CreateRequest } from "@root/source/types/generated/protos/room/CreateRequest";
import ProfileRepository from "@root/source/infrastructure/database/repositories/Profile.repository";

const roomRepository = new RoomRepository();
const memberRoomRepository = new MemberRoomRepository();
const profilesRepository = new ProfileRepository();

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
	const room = await roomRepository.Create(connection, {
		photoPath: data.photoPath,
		name: data.name,
		description: data.description,
		type: data.type,
		privacy: data.privacy!,
	});

	const members = AddRoomCreatorAsMember(data.requesterId, data.members);

	const membersEntity = await memberRoomRepository.CreateList(connection, {
		roomId: room.id,
		membersId: members,
	});

	return {
		information: room,
		members: membersEntity,
	};
};

export default {
	Serializer,
	Authorize,
	Handle,
};
