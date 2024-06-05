import MemberRoomDto, {
	ReadRequestSerialized,
} from "@root/source/application/dtos/member-room";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import MemberRoomRepository from "@root/source/infrastructure/database/repositories/MemberRoom.repository";
import { ReadRequest } from "@root/source/types/generated/protos/MemberRoomPackage/ReadRequest";

const repository = new MemberRoomRepository();

const Serializer = (data: ReadRequest) => MemberRoomDto.Read(data);

const Authorize = async (requesterId: string, data: ReadRequestSerialized) => {
	// tODO: can read if member or (public & group)
	return true;
};

const Handle = async (
	connection: DatabaseClient,
	data: ReadRequestSerialized & { requesterId: string },
) => {
	return await repository.Read(connection, {
		memberId: data.memberId,
		roomId: data.roomId,
	});
};

export default {
	Serializer,
	Authorize,
	Handle,
};
