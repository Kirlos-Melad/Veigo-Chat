import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import RoomEntity from "@source/domain/entities/Room.entity";
import ConvertObjectToArrays from "@source/application/utilities/ConvertObjectToArrays";
import ProfileEntity from "@source/domain/entities/Profile.entity";

type RoomCreate = Optional<
	Omit<RoomEntity, "id" | "createdAt" | "updatedAt">,
	"photoPath" | "description"
>;

// @ts-expect-error
type RoomList = PickAs<ProfileEntity, "id:profileId"> & {
	from?: string;
	limit: number;
};

type RoomRead = Pick<RoomEntity, "id">;
type RoomUpdate = Partial<
	Omit<RoomEntity, "id" | "type" | "createdAt" | "updatedAt">
>;

class RoomRepository {
	public async Create(
		connection: DatabaseClient,
		room: RoomCreate,
	): Promise<RoomEntity> {
		const { fields, values } = ConvertObjectToArrays(room);

		const fieldsString = fields.join(", ");
		const valuesString = values.map((_, idx) => `$${idx + 1}`).join(", ");

		const query = `
            INSERT INTO rooms
            (${fieldsString})
            VALUES(${valuesString})
            RETURNING *;
        `;

		return (await connection.Execute<RoomEntity>(query, values)).rows[0];
	}

	public async Read(
		connection: DatabaseClient,
		filter: RoomRead,
	): Promise<RoomEntity> {
		const query = `
            SELECT *
            FROM rooms
            WHERE id = ${filter.id};
        `;

		return (await connection.Execute<RoomEntity>(query)).rows[0];
	}

	public async List(
		connection: DatabaseClient,
		filter: RoomList,
	): Promise<RoomEntity[]> {
		let query = `
            SELECT rooms.*
            	FROM rooms
			INNER JOIN members_rooms 
				ON rooms.id = members_rooms.roomId
			WHERE\n
		`;

		if (filter.from) {
			query += `
					rooms.id > ${filter.from}
					AND\n
			`;
		}

		query += `
				members_rooms.profileId = ${filter.profileId}
			ORDER BY rooms.id ASC
			LIMIT ${filter.limit};
		`;

		return (await connection.Execute<RoomEntity>(query)).rows;
	}

	public async Update(
		connection: DatabaseClient,
		filter: RoomRead,
		update: RoomUpdate,
	): Promise<RoomEntity> {
		const { fields, values } = ConvertObjectToArrays(update);

		if (!values.length) return await this.Read(connection, filter);

		const setClause = fields
			.map((key, idx) => `${key} = $${idx + 1}`)
			.join(", ");

		const query = `
            UPDATE rooms
            SET ${setClause}
            WHERE id = '${filter.id}'
            RETURNING *;
        `;

		return (await connection.Execute<RoomEntity>(query, values)).rows[0];
	}
}

export default RoomRepository;
