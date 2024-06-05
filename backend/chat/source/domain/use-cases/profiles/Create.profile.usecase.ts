import ProfileDto, {
	CreateRequestSerialized,
} from "@root/source/application/dtos/profile";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import ProfileRepository from "@root/source/infrastructure/database/repositories/Profile.repository";
import { CreateRequest } from "@root/source/types/generated/protos/ProfilePackage/CreateRequest";

const repository = new ProfileRepository();

const Serializer = (data: CreateRequest) => ProfileDto.Create(data);

const Authorize = async (
	requesterId: string,
	data: CreateRequestSerialized,
) => {
	return true;
};

const Handle = async (
	connection: DatabaseClient,
	data: CreateRequestSerialized & { requesterId: string },
) => {
	return await repository.Create(connection, {
		id: data.requesterId,
		photoPath: data.photoPath,
		name: data.name,
		about: data.about!,
	});
};

export default {
	Serializer,
	Authorize,
	Handle,
};
