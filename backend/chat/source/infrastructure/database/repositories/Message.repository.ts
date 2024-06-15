import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import MessageEntity from "@source/domain/entities/Message.entity";
import ConvertObjectToArrays from "@source/application/utilities/ConvertObjectToArrays";

type MessageCreate = Pick<MessageEntity, "roomId" | "senderId" | "content">;

type MessagesRead = Pick<MessageEntity, "roomId">;
type MessageRead = Pick<MessageEntity, "id">;

type MessageUpdate = Partial<Pick<MessageEntity, "content">>;

class MessageRepository {
	public async Create(
		connection: DatabaseClient,
		Messages: MessageCreate,
	): Promise<MessageEntity> {
		const { fields, values } = ConvertObjectToArrays(Messages);

		const fieldsString = fields.join(", ");
		const valuesString = values.map((_, idx) => `$${idx + 1}`).join(", ");

		const query = `
            INSERT INTO messages
            (${fieldsString})
            VALUES(${valuesString})
            RETURNING *;
        `;

		return (await connection.Execute<MessageEntity>(query, values)).rows[0];
	}

	public async Read(
		connection: DatabaseClient,
		filter: MessageRead,
	): Promise<MessageEntity> {
		const query = `
            SELECT *
            FROM messages
            WHERE "id" = ${filter.id};
        `;

		return (await connection.Execute<MessageEntity>(query)).rows[0];
	}

	public async ReadBulk(
		connection: DatabaseClient,
		filter: MessagesRead,
	): Promise<MessageEntity[]> {
		const query = `
            SELECT *
            FROM messages
            WHERE "roomId" = ${filter.roomId};
        `;

		return (await connection.Execute<MessageEntity>(query)).rows;
	}

	public async Update(
		connection: DatabaseClient,
		filter: MessageRead,
		update: MessageUpdate,
	): Promise<MessageEntity> {
		const { fields, values } = ConvertObjectToArrays(update);

		if (!values.length) return await this.Read(connection, filter);

		const setClause = fields
			.map((key, idx) => `${key} = $${idx + 1}`)
			.join(", ");

		const query = `
			UPDATE profiles
			SET ${setClause}
			WHERE id = '${filter.id}'
			RETURNING *;
		`;

		return (await connection.Execute<MessageEntity>(query, values)).rows[0];
	}

	public async Delete(
		connection: DatabaseClient,
		filter: MessageRead,
	): Promise<MessageEntity> {
		const query = `
			DELETE FROM messages
			WHERE "id" = ${filter.id}
			RETURNING *;
		`;

		return (await connection.Execute<MessageEntity>(query)).rows[0];
	}
}

export default MessageRepository;
