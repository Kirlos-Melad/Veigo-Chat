import ProfileDto, {
	ReadRequestSerialized,
} from "@root/source/application/dtos/profile";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import ProfileRepository from "@root/source/infrastructure/database/repositories/Profile.repository";
import { DeleteRequest } from "@root/source/types/generated/protos/ProfilePackage/DeleteRequest";

const repository = new ProfileRepository();

const Serializer = (data: DeleteRequest) => ProfileDto.Read(data);

const Authorize = async (
	requesterId: string,
	data: ReadRequestSerialized,
) => {
	return requesterId != data.id;
};

const Handle = async (
	connection: DatabaseClient,
	data: ReadRequestSerialized & { requesterId: string },
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
