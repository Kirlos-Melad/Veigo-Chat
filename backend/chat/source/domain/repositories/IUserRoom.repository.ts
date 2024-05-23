import {
	UserRoomCreate,
	UserRoomRead,
} from "@source/application/dtos/user-room";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import UserRoomEntity from "../entities/UserRoom.entity";

interface IUserRoomRepository {
	Create(
		connection: DatabaseClient,
		userRoom: UserRoomCreate,
	): Promise<UserRoomEntity>;

	Read(
		connection: DatabaseClient,
		filter: UserRoomRead,
	): Promise<UserRoomEntity>;

	Delete(
		connection: DatabaseClient,
		filter: UserRoomRead,
	): Promise<UserRoomEntity>;
}

export default IUserRoomRepository;
