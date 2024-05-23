import {
	MessageCreate,
	MessageRead,
	MessageUpdate,
} from "@source/application/dtos/message";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import MessageEntity from "../entities/Message.entity";

interface IMessageRepository {
	Create(
		connection: DatabaseClient,
		message: MessageCreate,
	): Promise<MessageEntity>;

	Read(
		connection: DatabaseClient,
		filter: MessageRead,
	): Promise<MessageEntity>;

	Update(
		connection: DatabaseClient,
		filter: MessageRead,
		update: MessageUpdate,
	): Promise<MessageEntity>;

	Delete(
		connection: DatabaseClient,
		filter: MessageRead,
	): Promise<MessageEntity>;
}

export default IMessageRepository;
