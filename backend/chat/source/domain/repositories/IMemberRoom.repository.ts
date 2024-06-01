import {
	MemberRoomCreate,
	MemberRoomRead,
} from "@root/source/application/dtos/member-room";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import MemberRoomEntity from "../entities/MemberRoom.entity";

interface IMemberRoomRepository {
	Create(
		connection: DatabaseClient,
		userRoom: MemberRoomCreate,
	): Promise<MemberRoomEntity>;

	Read(
		connection: DatabaseClient,
		filter: MemberRoomRead,
	): Promise<MemberRoomEntity>;

	Delete(
		connection: DatabaseClient,
		filter: MemberRoomRead,
	): Promise<MemberRoomEntity>;
}

export default IMemberRoomRepository;
