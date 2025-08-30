import MemberRoomDto from "@source/application/dtos/member-room";
import { ListRequestSerialized } from "@source/application/dtos/message";
import AuthorizationManager from "@source/application/utilities/AuthorizationManager";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import MemberRoomRepository from "@source/infrastructure/database/repositories/MemberRoom.repository";
import { ListRequest } from "@source/types/generated/protos/member_room/ListRequest";

const repository = new MemberRoomRepository();

const Serializer = (data: ListRequest) => MemberRoomDto.List(data);

const Authorize = async (requesterId: string, data: ListRequestSerialized) =>
	await AuthorizationManager.instance.CanReadRoom({
		roomId: data.roomId,
		userId: requesterId,
	});

const Handle = async (
	connection: DatabaseClient,
	data: ListRequestSerialized & { requesterId: string },
) => {
	const members = await repository.List(connection, {
		type: "roomId",
		value: data.roomId,
		from: data.page.cursor,
		limit: data.page.size! + 1,
	});

	const hasNext = members.length > data.page.size!;
	const cursor = hasNext ? members.pop()!.roomId : undefined;

	return {
		records: members,
		metadata: {
			cursor: cursor,
			hasNext: hasNext,
		},
	};
};

export default {
	Serializer,
	Authorize,
	Handle,
};
