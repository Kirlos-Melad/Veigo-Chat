import { MessageHandlers } from "@source/types/generated/protos/MessagePackage/Message";
import { CreateRequest } from "@source/types/generated/protos/MessagePackage/CreateRequest";
import { ReadRequest } from "@source/types/generated/protos/MessagePackage/ReadRequest";
import { UpdateRequest } from "@source/types/generated/protos/MessagePackage/UpdateRequest";
import { DeleteRequest } from "@source/types/generated/protos/MessagePackage/DeleteRequest";
import DatabaseManager, {
	DatabaseClient,
} from "@source/infrastructure/database/DatabaseManager";
import MessageDto from "../dtos/message";
import IMessageRepository from "@source/domain/repositories/IMessage.repository";

import GrpcService from "@source/infrastructure/grpc/Grpc.service";
import TransactionalCall, {
	HandlerResult,
} from "../utilities/TransactionalCall";
import MessageEntity from "@source/domain/entities/Message.entity";

class MessageService extends GrpcService<MessageHandlers> {
	private mRepository: IMessageRepository;

	constructor(repository: IMessageRepository) {
		super(DatabaseManager.instance);
		this.mRepository = repository;
	}

	public get handlers(): MessageHandlers {
		return {
			Create: TransactionalCall(this.Create.bind(this)),
			Read: TransactionalCall(this.Read.bind(this)),
			Update: TransactionalCall(this.Update.bind(this)),
			Delete: TransactionalCall(this.Delete.bind(this)),
		} as MessageHandlers;
	}

	public async Create(
		connection: DatabaseClient,
		data: CreateRequest,
	): Promise<HandlerResult<MessageEntity>> {
		try {
			const messageCreateDto = MessageDto.Create(data);
			messageCreateDto.Serialize();

			const result = await this.mRepository.Create(
				connection,
				messageCreateDto.data!,
			);

			return { error: null, result };
		} catch (error) {
			return { error, result: null };
		}
	}

	public async Read(
		connection: DatabaseClient,
		data: ReadRequest,
	): Promise<HandlerResult<MessageEntity>> {
		try {
			const messageReadDto = MessageDto.Read(data);
			messageReadDto.Serialize();

			const result = await this.mRepository.Read(
				connection,
				messageReadDto.data!,
			);

			return { error: null, result };
		} catch (error) {
			return { error, result: null };
		}
	}

	public async Update(
		connection: DatabaseClient,
		data: UpdateRequest,
	): Promise<HandlerResult<MessageEntity>> {
		try {
			const messageReadDto = MessageDto.Read(data);
			messageReadDto.Serialize();
			const messageUpdateDto = MessageDto.Update(data);
			messageUpdateDto.Serialize();

			const result = await this.mRepository.Update(
				connection,
				messageReadDto.data!,
				messageUpdateDto.data!,
			);

			return { error: null, result };
		} catch (error) {
			return { error, result: null };
		}
	}

	public async Delete(
		connection: DatabaseClient,
		data: DeleteRequest,
	): Promise<HandlerResult<MessageEntity>> {
		try {
			const messageReadDto = MessageDto.Read(data);
			messageReadDto.Serialize();

			const result = await this.mRepository.Delete(
				connection,
				messageReadDto.data!,
			);

			return { error: null, result };
		} catch (error) {
			return { error, result: null };
		}
	}
}

export default MessageService;
