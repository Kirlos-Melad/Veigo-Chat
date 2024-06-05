import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import MemberRoomEntity from "@root/source/domain/entities/MemberRoom.entity";
import ConvertObjectToArrays from "@source/application/utilities/ConvertObjectToArrays";

type MemberRoomCreate = Pick<MemberRoomEntity, "memberId" | "roomId">;

type MemberRoomRead = Partial<Pick<MemberRoomEntity, "memberId" | "roomId">>;

class MemberRoomRepository {
	public async Create(
		connection: DatabaseClient,
		userRooms: MemberRoomCreate,
	): Promise<MemberRoomEntity> {
		const { fields, values } = ConvertObjectToArrays(userRooms);

		const fieldsString = fields.join(", ");
		const valuesString = values.map((_, idx) => `$${idx + 1}`).join(", ");

		const query = `
            INSERT INTO user_rooms
            (${fieldsString})
            VALUES(${valuesString})
            RETURNING *;
        `;

		return (await connection.Execute<MemberRoomEntity>(query, values))
			.rows[0];
	}

	public async Read(
		connection: DatabaseClient,
		filter: MemberRoomRead,
	): Promise<MemberRoomEntity> {
		const query = `
            SELECT *
            FROM user_rooms
            WHERE "memberId" = ${filter.memberId};
        `;

		return (await connection.Execute<MemberRoomEntity>(query)).rows[0];
	}

	public async Delete(
		connection: DatabaseClient,
		filter: MemberRoomRead,
	): Promise<MemberRoomEntity> {
		const query = `
			DELETE FROM user_rooms
			WHERE "memberId" = ${filter.memberId}
			RETURNING *;
		`;

		return (await connection.Execute<MemberRoomEntity>(query)).rows[0];
	}
}

export default MemberRoomRepository;
