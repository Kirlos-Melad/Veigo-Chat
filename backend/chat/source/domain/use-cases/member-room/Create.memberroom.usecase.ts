import MemberRoomDto, {
	CreateRequestSerialized,
} from "@root/source/application/dtos/member-room";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import MemberRoomRepository from "@root/source/infrastructure/database/repositories/MemberRoom.repository";
import { CreateRequest } from "@root/source/types/generated/protos/MemberRoomPackage/CreateRequest";

const repository = new MemberRoomRepository();

const Serializer = (data: CreateRequest) => MemberRoomDto.Create(data);

const Authorize = async (
	requesterId: string,
	data: CreateRequestSerialized,
) => {
	//TODO: must be in room to add someone
	return true;
};

const Handle = async (
	connection: DatabaseClient,
	data: CreateRequestSerialized & { requesterId: string },
) => {
	return await repository.Create(connection, {
		memberId: data.memberId,
		roomId: data.roomId,
	});
};

export default {
	Serializer,
	Authorize,
	Handle,
};
