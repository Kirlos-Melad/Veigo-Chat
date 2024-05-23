import {
	RoomCreate,
	RoomRead,
	RoomUpdate,
} from "@source/application/dtos/room";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import RoomEntity from "../entities/Room.entity";

interface IRoomRepository {
	Create(connection: DatabaseClient, room: RoomCreate): Promise<RoomEntity>;

	Read(connection: DatabaseClient, filter: RoomRead): Promise<RoomEntity>;

	Update(
		connection: DatabaseClient,
		filter: RoomRead,
		update: RoomUpdate,
	): Promise<RoomEntity>;

	Delete(connection: DatabaseClient, filter: RoomRead): Promise<RoomEntity>;
}

export default IRoomRepository;
