import MemberRoomDto, {
	LeaveRequestSerialized,
} from "@source/application/dtos/member-room";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import MemberRoomRepository from "@source/infrastructure/database/repositories/MemberRoom.repository";
import { LeaveRequest } from "@source/types/generated/protos/member_room/LeaveRequest";

const repository = new MemberRoomRepository();

const Serializer = (data: LeaveRequest) => MemberRoomDto.Leave(data);

//? Any member can leave the room
const Authorize = async () => true;

const Handle = async (
	connection: DatabaseClient,
	data: LeaveRequestSerialized & { requesterId: string },
) => {
	return await repository.Delete(connection, {
		roomId: data.roomId,
		memberId: data.requesterId,
	});
};

export default {
	Serializer,
	Authorize,
	Handle,
};
