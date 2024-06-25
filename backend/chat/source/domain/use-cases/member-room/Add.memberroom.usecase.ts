import MemberRoomDto, {
	AddRequestSerialized,
} from "@root/source/application/dtos/member-room";
import AuthorizationManager from "@root/source/application/utilities/AuthorizationManager";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import MemberRoomRepository from "@root/source/infrastructure/database/repositories/MemberRoom.repository";
import { AddRequest } from "@root/source/types/generated/protos/member_room/AddRequest";

const repository = new MemberRoomRepository();

const Serializer = (data: AddRequest) => MemberRoomDto.Add(data);

const Authorize = async (requesterId: string, data: AddRequestSerialized) =>
	await AuthorizationManager.instance.CanEditRoom({
		roomId: data.roomId,
		userId: requesterId,
	});

const Handle = async (
	connection: DatabaseClient,
	data: AddRequestSerialized & { requesterId: string },
) => {
	return {
		members: await repository.CreateList(connection, {
			roomId: data.roomId,
			membersId: data.membersId,
		}),
	};
};

export default {
	Serializer,
	Authorize,
	Handle,
};
