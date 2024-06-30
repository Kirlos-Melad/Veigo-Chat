import ProfileDto, {
	UpdateRequestSerialized,
} from "@source/application/dtos/profile";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import ProfileRepository from "@source/infrastructure/database/repositories/Profile.repository";
import { UpdateRequest } from "@source/types/generated/protos/profile/UpdateRequest";

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
