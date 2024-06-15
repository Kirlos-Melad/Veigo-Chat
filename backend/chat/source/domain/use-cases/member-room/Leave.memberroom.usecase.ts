import MemberRoomDto, {
	LeaveRequestSerialized,
} from "@root/source/application/dtos/member-room";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import MemberRoomRepository from "@root/source/infrastructure/database/repositories/MemberRoom.repository";
import { LeaveRequest } from "@root/source/types/generated/protos/MemberRoomPackage/LeaveRequest";

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
