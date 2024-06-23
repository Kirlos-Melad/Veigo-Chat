import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import MemberRoomEntity from "@root/source/domain/entities/MemberRoom.entity";
import ConvertObjectToArrays from "@source/application/utilities/ConvertObjectToArrays";

type MemberRoomCreate = Pick<MemberRoomEntity, "memberId" | "roomId">;
type RoomMembers = { roomId: string; membersId: string[] };
type RoomMember = { roomId: string; memberId: string };
type MemberRoomRead = (
	| {
			type: "memberId";
			value: MemberRoomEntity["memberId"];
	  }
	| {
			type: "roomId";
			value: MemberRoomEntity["roomId"];
	  }
) & {
	from?: string;
	limit: number;
};

class MemberRoomRepository {
	public async Create(
		connection: DatabaseClient,
		memberRoom: MemberRoomCreate,
	): Promise<MemberRoomEntity> {
		const { fields, values } = ConvertObjectToArrays(memberRoom);

		const fieldsString = fields.join(", ");
		const valuesString = values.map((_, idx) => `$${idx + 1}`).join(", ");

		const query = `
            INSERT INTO members_rooms
            (${fieldsString})
            VALUES(${valuesString})
            RETURNING *;
        `;

		return (await connection.Execute<MemberRoomEntity>(query, values))
			.rows[0];
	}

	public async CreateList(
		connection: DatabaseClient,
		roomMembers: RoomMembers,
	): Promise<MemberRoomEntity[]> {
		const { roomId, membersId } = roomMembers;
		if (!membersId.length) return [];

		const roomIdx = membersId.length + 1;

		const valuesString = membersId
			.map((_, idx) => `($${idx + 1}, $${roomIdx})`)
			.join(",\n");

		const query = `
			INSERT INTO members_rooms
			("memberId", "roomId")
			VALUES
			${valuesString}
			RETURNING *;
		`;

		return (
			await connection.Execute<MemberRoomEntity>(query, [
				...membersId,
				roomId,
			])
		).rows;
	}

	public async List(
		connection: DatabaseClient,
		filter: MemberRoomRead,
	): Promise<MemberRoomEntity[]> {
		let query = `
            SELECT *
            FROM members_rooms
            WHERE\n
        `;

		if (filter.from) {
			query += `
				${filter.type} > ${filter.from}
				AND\n
			`;
		}

		query += `
			${filter.type} = ${filter.value}
			ORDER BY ${filter.type} ASC
			LIMIT ${filter.limit};
		`;

		return (await connection.Execute<MemberRoomEntity>(query)).rows;
	}

	public async Delete(
		connection: DatabaseClient,
		filter: RoomMember,
	): Promise<MemberRoomEntity> {
		const query = `
			DELETE FROM members_rooms
			WHERE "memberId" = ${filter.memberId}
			RETURNING *;
		`;

		return (await connection.Execute<MemberRoomEntity>(query)).rows[0];
	}
}

export default MemberRoomRepository;
