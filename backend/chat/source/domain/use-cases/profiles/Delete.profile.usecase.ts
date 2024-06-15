import ProfileDto, {
	DeleteRequestSerialized,
} from "@root/source/application/dtos/profile";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import ProfileRepository from "@root/source/infrastructure/database/repositories/Profile.repository";
import { DeleteRequest } from "@root/source/types/generated/protos/ProfilePackage/DeleteRequest";

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
