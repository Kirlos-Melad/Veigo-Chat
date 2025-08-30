import CommonDto, {
	PaginationRequestSerialized,
} from "@source/application/dtos/common";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import RoomRepository from "@source/infrastructure/database/repositories/Room.repository";
import { PaginationRequest } from "@source/types/generated/protos/common_objects/PaginationRequest";

const roomRepository = new RoomRepository();

const Serializer = (data: PaginationRequest) => CommonDto.Pagination(data);

const Authorize = async (
	requesterId: string,
	data: PaginationRequestSerialized,
) => true;

const Handle = async (
	connection: DatabaseClient,
	data: PaginationRequestSerialized & { requesterId: string },
) => {
	const rooms = await roomRepository.List(connection, {
		profileId: data.requesterId,
		from: data.cursor,
		limit: data.size! + 1,
	});

	const hasNext = rooms.length > data.size!;
	const cursor = hasNext ? rooms.pop()!.id : undefined;

	return {
		records: rooms,
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
