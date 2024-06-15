import ProfileDto, {
	UpdateRequestSerialized,
} from "@root/source/application/dtos/profile";
import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import ProfileRepository from "@root/source/infrastructure/database/repositories/Profile.repository";
import { UpdateRequest } from "@root/source/types/generated/protos/ProfilePackage/UpdateRequest";

const repository = new ProfileRepository();

const Serializer = (data: UpdateRequest) => ProfileDto.Update(data);

//? Only the profile owner can update it
const Authorize = async (requesterId: string, data: UpdateRequestSerialized) =>
	requesterId != data.id;

const Handle = async (
	connection: DatabaseClient,
	data: UpdateRequestSerialized & { requesterId: string },
) => {
	return await repository.Update(
		connection,
		{
			id: data.id,
		},
		{
			photoPath: data.photoPath,
			name: data.name,
			about: data.about,
		},
	);
};

export default {
	Serializer,
	Authorize,
	Handle,
};
