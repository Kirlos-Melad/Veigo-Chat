import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import IMemberRoomRepository from "@root/source/domain/repositories/IMemberRoom.repository";
import {
	MemberRoomCreate,
	MemberRoomRead,
} from "@root/source/application/dtos/member-room";
import MemberRoomsEntity from "@root/source/domain/entities/MemberRoom.entity";
import ConvertObjectToArrays from "@source/application/utilities/ConvertObjectToArrays";

class MemberRoomRepository implements IMemberRoomRepository {
	public async Create(
		connection: DatabaseClient,
		userRooms: MemberRoomCreate,
	): Promise<MemberRoomsEntity> {
		const { fields, values } = ConvertObjectToArrays(userRooms);

		const fieldsString = fields.join(", ");
		const valuesString = values.map((_, idx) => `$${idx + 1}`).join(", ");

		const query = `
            INSERT INTO user_rooms
            (${fieldsString})
            VALUES(${valuesString})
            RETURNING *;
        `;

		return (await connection.Execute<MemberRoomsEntity>(query, values))
			.rows[0];
	}

	public async Read(
		connection: DatabaseClient,
		filter: MemberRoomRead,
	): Promise<MemberRoomsEntity> {
		const query = `
            SELECT *
            FROM user_rooms
            WHERE "memberId" = ${filter.memberId};
        `;

		return (await connection.Execute<MemberRoomsEntity>(query)).rows[0];
	}

	public async Delete(
		connection: DatabaseClient,
		filter: MemberRoomRead,
	): Promise<MemberRoomsEntity> {
		const query = `
			DELETE FROM user_rooms
			WHERE "memberId" = ${filter.memberId}
			RETURNING *;
		`;

		return (await connection.Execute<MemberRoomsEntity>(query)).rows[0];
	}
}

export default MemberRoomRepository;
