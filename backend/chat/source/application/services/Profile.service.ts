import { ProfileHandlers } from "@source/types/generated/ProfilePackage/Profile";
import { CreateRequest } from "@source/types/generated/ProfilePackage/CreateRequest";
import { ReadRequest } from "@source/types/generated/ProfilePackage/ReadRequest";
import { UpdateRequest } from "@source/types/generated/ProfilePackage/UpdateRequest";
import { DeleteRequest } from "@source/types/generated/ProfilePackage/DeleteRequest";
import DatabaseManager, {
	DatabaseClient,
} from "@source/infrastructure/database/DatabaseManager";
import ProfileDto from "../dtos/profile";
import IProfileRepository from "@source/domain/repositories/IProfile.repository";

import GrpcService from "@source/infrastructure/grpc/Grpc.service";
import TransactionalCall, {
	HandlerResult,
} from "../utilities/TransactionalCall";
import ProfileEntity from "@source/domain/entities/Profile.entity";

class ProfileService extends GrpcService<ProfileHandlers> {
	private mRepository: IProfileRepository;

	constructor(repository: IProfileRepository) {
		super(DatabaseManager.instance);
		this.mRepository = repository;
	}

	public get handlers(): ProfileHandlers {
		return {
			Create: TransactionalCall(this.Create.bind(this)),
			Read: TransactionalCall(this.Read.bind(this)),
			Update: TransactionalCall(this.Update.bind(this)),
			Delete: TransactionalCall(this.Delete.bind(this)),
		} as ProfileHandlers;
	}

	public async Create(
		connection: DatabaseClient,
		data: CreateRequest,
	): Promise<HandlerResult<ProfileEntity>> {
		try {
			const profileCreateDto = ProfileDto.Create(data);
			profileCreateDto.Serialize();

			const result = await this.mRepository.Create(
				connection,
				profileCreateDto.data!,
			);

			return { error: null, result };
		} catch (error) {
			return { error, result: null };
		}
	}

	public async Read(
		connection: DatabaseClient,
		data: ReadRequest,
	): Promise<HandlerResult<ProfileEntity>> {
		try {
			const profileReadDto = ProfileDto.Read(data);
			profileReadDto.Serialize();

			const result = await this.mRepository.Read(
				connection,
				profileReadDto.data!,
			);

			return { error: null, result };
		} catch (error) {
			return { error, result: null };
		}
	}

	public async Update(
		connection: DatabaseClient,
		data: UpdateRequest,
	): Promise<HandlerResult<ProfileEntity>> {
		try {
			const profileReadDto = ProfileDto.Read(data);
			profileReadDto.Serialize();
			const profileUpdateDto = ProfileDto.Update(data);
			profileUpdateDto.Serialize();

			const result = await this.mRepository.Update(
				connection,
				profileReadDto.data!,
				profileUpdateDto.data!,
			);

			return { error: null, result };
		} catch (error) {
			return { error, result: null };
		}
	}

	public async Delete(
		connection: DatabaseClient,
		data: DeleteRequest,
	): Promise<HandlerResult<ProfileEntity>> {
		try {
			const profileReadDto = ProfileDto.Read(data);
			profileReadDto.Serialize();

			const result = await this.mRepository.Delete(
				connection,
				profileReadDto.data!,
			);

			return { error: null, result };
		} catch (error) {
			return { error, result: null };
		}
	}
}

export default ProfileService;
