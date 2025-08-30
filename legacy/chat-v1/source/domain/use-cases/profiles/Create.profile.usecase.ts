import ProfileDto, {
	CreateRequestSerialized,
} from "@source/application/dtos/profile";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import ProfileRepository from "@source/infrastructure/database/repositories/Profile.repository";
import { CreateRequest } from "@source/types/generated/protos/profile/CreateRequest";

const repository = new ProfileRepository();

const Serializer = (data: CreateRequest) => ProfileDto.Create(data);

//? Anyone can create a profile to himself
const Authorize = async () => true;

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
