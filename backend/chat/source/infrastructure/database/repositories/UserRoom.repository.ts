import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import IUserRoomRepository from "@source/domain/repositories/IUserRoom.repository";
import {
	UserRoomCreate,
	UserRoomRead,
} from "@source/application/dtos/user-room";
import UserRoomsEntity from "@source/domain/entities/UserRoom.entity";
import ConvertObjectToArrays from "@source/application/utilities/ConvertObjectToArrays";

class UserRoomRepository implements IUserRoomRepository {
	public async Create(
		connection: DatabaseClient,
		userRooms: UserRoomCreate,
	): Promise<UserRoomsEntity> {
		const { fields, values } = ConvertObjectToArrays(userRooms);

		const fieldsString = fields.join(", ");
		const valuesString = values.map((_, idx) => `$${idx + 1}`).join(", ");

		const query = `
            INSERT INTO user_rooms
            (${fieldsString})
            VALUES(${valuesString})
            RETURNING *;
        `;

		return (await connection.Execute<UserRoomsEntity>(query, values))
			.rows[0];
	}

	public async Read(
		connection: DatabaseClient,
		filter: UserRoomRead,
	): Promise<UserRoomsEntity> {
		const query = `
            SELECT *
            FROM user_rooms
            WHERE "userId" = ${filter.userId};
        `;

		return (await connection.Execute<UserRoomsEntity>(query)).rows[0];
	}

	public async Delete(
		connection: DatabaseClient,
		filter: UserRoomRead,
	): Promise<UserRoomsEntity> {
		const query = `
			DELETE FROM user_rooms
			WHERE "userId" = ${filter.userId}
			RETURNING *;
		`;

		return (await connection.Execute<UserRoomsEntity>(query)).rows[0];
	}
}

export default UserRoomRepository;
