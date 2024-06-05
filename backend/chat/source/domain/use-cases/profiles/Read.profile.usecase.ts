import ProfileDto, {
	ReadRequestSerialized,
} from "@root/source/application/dtos/profile";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import ProfileRepository from "@root/source/infrastructure/database/repositories/Profile.repository";
import { ReadRequest } from "@root/source/types/generated/protos/ProfilePackage/ReadRequest";

const repository = new ProfileRepository();

const Serializer = (data: ReadRequest) => ProfileDto.Read(data);

const Authorize = async (requesterId: string, data: ReadRequestSerialized) => {
	// TODO: make profile private?
	return true;
};

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
