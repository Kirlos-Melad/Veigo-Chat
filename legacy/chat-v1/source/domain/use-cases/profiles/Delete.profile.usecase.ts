import ProfileDto, {
	DeleteRequestSerialized,
} from "@source/application/dtos/profile";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import ProfileRepository from "@source/infrastructure/database/repositories/Profile.repository";
import { DeleteRequest } from "@source/types/generated/protos/profile/DeleteRequest";

const repository = new ProfileRepository();

const Serializer = (data: DeleteRequest) => ProfileDto.Delete(data);

//? Only the profile owner can delete it
const Authorize = async (requesterId: string, data: DeleteRequestSerialized) =>
	requesterId != data.id;

const Handle = async (
	connection: DatabaseClient,
	data: DeleteRequestSerialized & { requesterId: string },
) => {
	return await repository.Delete(connection, {
		id: data.id,
	});
};

export default {
	Serializer,
	Authorize,
	Handle,
};
