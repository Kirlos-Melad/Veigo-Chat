import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import IMessageRepository from "@source/domain/repositories/IMessage.repository";
import { MessageCreate, MessageRead } from "@source/application/dtos/message";
import MessagesEntity from "@source/domain/entities/Message.entity";
import ConvertObjectToArrays from "@source/application/utilities/ConvertObjectToArrays";

class MessageRepository implements IMessageRepository {
	public async Create(
		connection: DatabaseClient,
		Messages: MessageCreate,
	): Promise<MessagesEntity> {
		const { fields, values } = ConvertObjectToArrays(Messages);

		const fieldsString = fields.join(", ");
		const valuesString = values.map((_, idx) => `$${idx + 1}`).join(", ");

		const query = `
            INSERT INTO messages
            (${fieldsString})
            VALUES(${valuesString})
            RETURNING *;
        `;

		return (await connection.Execute<MessagesEntity>(query, values))
			.rows[0];
	}

	public async Read(
		connection: DatabaseClient,
		filter: MessageRead,
	): Promise<MessagesEntity> {
		const query = `
            SELECT *
            FROM messages
            WHERE "id" = ${filter.id};
        `;

		return (await connection.Execute<MessagesEntity>(query)).rows[0];
	}

	public async Update(
		connection: DatabaseClient,
		filter: MessageRead,
		update: Partial<Pick<MessagesEntity, "content">>,
	): Promise<MessagesEntity> {
		const { fields, values } = ConvertObjectToArrays(update);

		if (!values.length) return await this.Read(connection, filter);

		const setClause = fields
			.map((key, idx) => `"${key}" = $${idx + 1}`)
			.join(", ");

		const query = `
			UPDATE profiles
			SET ${setClause}
			WHERE id = '${filter.id}'
			RETURNING *;
		`;

		return (await connection.Execute<MessagesEntity>(query, values))
			.rows[0];
	}

	public async Delete(
		connection: DatabaseClient,
		filter: MessageRead,
	): Promise<MessagesEntity> {
		const query = `
			DELETE FROM messages
			WHERE "id" = ${filter.id}
			RETURNING *;
		`;

		return (await connection.Execute<MessagesEntity>(query)).rows[0];
	}
}

export default MessageRepository;
