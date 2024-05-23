import { RoomHandlers } from "@source/types/generated/RoomPackage/Room";
import { CreateRequest } from "@source/types/generated/RoomPackage/CreateRequest";
import { ReadRequest } from "@source/types/generated/RoomPackage/ReadRequest";
import { UpdateRequest } from "@source/types/generated/RoomPackage/UpdateRequest";
import { DeleteRequest } from "@source/types/generated/RoomPackage/DeleteRequest";
import DatabaseManager, {
	DatabaseClient,
} from "@source/infrastructure/database/DatabaseManager";
import RoomDto from "../dtos/room";
import IRoomRepository from "@source/domain/repositories/IRoom.repository";

import GrpcService from "@source/infrastructure/grpc/Grpc.service";
import TransactionalCall, {
	HandlerResult,
} from "../utilities/TransactionalCall";
import RoomEntity from "@source/domain/entities/Room.entity";

class RoomService extends GrpcService<RoomHandlers> {
	private mRepository: IRoomRepository;

	constructor(repository: IRoomRepository) {
		super(DatabaseManager.instance);
		this.mRepository = repository;
	}

	public get handlers(): RoomHandlers {
		return {
			Create: TransactionalCall(this.Create.bind(this)),
			Read: TransactionalCall(this.Read.bind(this)),
			Update: TransactionalCall(this.Update.bind(this)),
			Delete: TransactionalCall(this.Delete.bind(this)),
		} as RoomHandlers;
	}

	public async Create(
		connection: DatabaseClient,
		data: CreateRequest,
	): Promise<HandlerResult<RoomEntity>> {
		try {
			const roomCreateDto = RoomDto.Create(data);
			roomCreateDto.Serialize();

			const result = await this.mRepository.Create(
				connection,
				roomCreateDto.data!,
			);

			return { error: null, result };
		} catch (error) {
			return { error, result: null };
		}
	}

	public async Read(
		connection: DatabaseClient,
		data: ReadRequest,
	): Promise<HandlerResult<RoomEntity>> {
		try {
			const roomReadDto = RoomDto.Read(data);
			roomReadDto.Serialize();

			const result = await this.mRepository.Read(
				connection,
				roomReadDto.data!,
			);

			return { error: null, result };
		} catch (error) {
			return { error, result: null };
		}
	}

	public async Update(
		connection: DatabaseClient,
		data: UpdateRequest,
	): Promise<HandlerResult<RoomEntity>> {
		try {
			const roomReadDto = RoomDto.Read(data);
			roomReadDto.Serialize();
			const roomUpdateDto = RoomDto.Update(data);
			roomUpdateDto.Serialize();

			const result = await this.mRepository.Update(
				connection,
				roomReadDto.data!,
				roomUpdateDto.data!,
			);

			return { error: null, result };
		} catch (error) {
			return { error, result: null };
		}
	}

	public async Delete(
		connection: DatabaseClient,
		data: DeleteRequest,
	): Promise<HandlerResult<RoomEntity>> {
		try {
			const roomReadDto = RoomDto.Read(data);
			roomReadDto.Serialize();

			const result = await this.mRepository.Delete(
				connection,
				roomReadDto.data!,
			);

			return { error: null, result };
		} catch (error) {
			return { error, result: null };
		}
	}
}

export default RoomService;
