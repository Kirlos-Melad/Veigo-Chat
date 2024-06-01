import { MemberRoomHandlers } from "@source/types/generated/protos/MemberRoomPackage/MemberRoom";
import { CreateRequest } from "@source/types/generated/protos/MemberRoomPackage/CreateRequest";
import { ReadRequest } from "@source/types/generated/protos/MemberRoomPackage/ReadRequest";
import { DeleteRequest } from "@source/types/generated/protos/MemberRoomPackage/DeleteRequest";
import DatabaseManager, {
	DatabaseClient,
} from "@source/infrastructure/database/DatabaseManager";
import MemberRoomDto from "../dtos/member-room";
import IMemberRoomRepository from "@root/source/domain/repositories/IMemberRoom.repository";

import GrpcService from "@source/infrastructure/grpc/Grpc.service";
import TransactionalCall, {
	HandlerResult,
} from "../utilities/TransactionalCall";
import MemberRoomEntity from "@root/source/domain/entities/MemberRoom.entity";

class MemberRoomService extends GrpcService<MemberRoomHandlers> {
	private mRepository: IMemberRoomRepository;

	constructor(repository: IMemberRoomRepository) {
		super(DatabaseManager.instance);
		this.mRepository = repository;
	}

	public get handlers(): MemberRoomHandlers {
		return {
			Create: TransactionalCall(this.Create.bind(this)),
			Read: TransactionalCall(this.Read.bind(this)),
			Delete: TransactionalCall(this.Delete.bind(this)),
		} as MemberRoomHandlers;
	}

	public async Create(
		connection: DatabaseClient,
		data: CreateRequest,
	): Promise<HandlerResult<MemberRoomEntity>> {
		try {
			const userRoomCreateDto = MemberRoomDto.Create(data);
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
	): Promise<HandlerResult<MemberRoomEntity>> {
		try {
			const userRoomReadDto = MemberRoomDto.Read(data);
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
	): Promise<HandlerResult<MemberRoomEntity>> {
		try {
			const userRoomReadDto = MemberRoomDto.Read(data);
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

export default MemberRoomService;
