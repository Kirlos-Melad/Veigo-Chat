import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import IRoomRepository from "@source/domain/repositories/IRoom.repository";
import {
	RoomCreate,
	RoomRead,
	RoomUpdate,
} from "@source/application/dtos/room";
import RoomEntity from "@source/domain/entities/Room.entity";
import ConvertObjectToArrays from "@source/application/utilities/ConvertObjectToArrays";

class RoomRepository implements IRoomRepository {
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

	public async Delete(
		connection: DatabaseClient,
		filter: RoomRead,
	): Promise<RoomEntity> {
		const query = `
            DELETE FROM rooms
            WHERE id = ${filter.id}
            RETURNING *;
        `;

		return (await connection.Execute<RoomEntity>(query)).rows[0];
	}
}

export default RoomRepository;
