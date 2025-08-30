import ProfileDto, {
	ReadRequestSerialized,
} from "@source/application/dtos/profile";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import ProfileRepository from "@source/infrastructure/database/repositories/Profile.repository";
import { ReadRequest } from "@source/types/generated/protos/profile/ReadRequest";

const repository = new ProfileRepository();

const Serializer = (data: ReadRequest) => ProfileDto.Read(data);

// TODO: make profile private?
//? Anyone can read any profile
const Authorize = async () => true;

const Handle = async (
	connection: DatabaseClient,
	data: ReadRequestSerialized & { requesterId: string },
) => {
	return await repository.Read(connection, {
		id: data.id,
	});
};

export default {
	Serializer,
	Authorize,
	Handle,
};
