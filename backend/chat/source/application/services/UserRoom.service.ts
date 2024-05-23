import { UserRoomHandlers } from "@source/types/generated/UserRoomPackage/UserRoom";
import { CreateRequest } from "@source/types/generated/UserRoomPackage/CreateRequest";
import { ReadRequest } from "@source/types/generated/UserRoomPackage/ReadRequest";
import { DeleteRequest } from "@source/types/generated/UserRoomPackage/DeleteRequest";
import DatabaseManager, {
	DatabaseClient,
} from "@source/infrastructure/database/DatabaseManager";
import UserRoomDto from "../dtos/user-room";
import IUserRoomRepository from "@source/domain/repositories/IUserRoom.repository";

import GrpcService from "@source/infrastructure/grpc/Grpc.service";
import TransactionalCall, {
	HandlerResult,
} from "../utilities/TransactionalCall";
import UserRoomEntity from "@source/domain/entities/UserRoom.entity";

class UserRoomService extends GrpcService<UserRoomHandlers> {
	private mRepository: IUserRoomRepository;

	constructor(repository: IUserRoomRepository) {
		super(DatabaseManager.instance);
		this.mRepository = repository;
	}

	public get handlers(): UserRoomHandlers {
		return {
			Create: TransactionalCall(this.Create.bind(this)),
			Read: TransactionalCall(this.Read.bind(this)),
			Delete: TransactionalCall(this.Delete.bind(this)),
		} as UserRoomHandlers;
	}

	public async Create(
		connection: DatabaseClient,
		data: CreateRequest,
	): Promise<HandlerResult<UserRoomEntity>> {
		try {
			const userRoomCreateDto = UserRoomDto.Create(data);
			userRoomCreateDto.Serialize();

			const result = await this.mRepository.Create(
				connection,
				userRoomCreateDto.data!,
			);

			return { error: null, result };
		} catch (error) {
			return { error, result: null };
		}
	}

	public async Read(
		connection: DatabaseClient,
		data: ReadRequest,
	): Promise<HandlerResult<UserRoomEntity>> {
		try {
			const userRoomReadDto = UserRoomDto.Read(data);
			userRoomReadDto.Serialize();

			const result = await this.mRepository.Read(
				connection,
				userRoomReadDto.data!,
			);

			return { error: null, result };
		} catch (error) {
			return { error, result: null };
		}
	}

	public async Delete(
		connection: DatabaseClient,
		data: DeleteRequest,
	): Promise<HandlerResult<UserRoomEntity>> {
		try {
			const userRoomReadDto = UserRoomDto.Read(data);
			userRoomReadDto.Serialize();

			const result = await this.mRepository.Delete(
				connection,
				userRoomReadDto.data!,
			);

			return { error: null, result };
		} catch (error) {
			return { error, result: null };
		}
	}
}

export default UserRoomService;
