import {
	ProfileCreate,
	ProfileRead,
	ProfileUpdate,
} from "@source/application/dtos/profile";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import ProfileEntity from "../entities/Profile.entity";

interface IProfileRepository {
	Create(
		connection: DatabaseClient,
		Profile: ProfileCreate,
	): Promise<ProfileEntity>;

	Read(
		connection: DatabaseClient,
		filter: ProfileRead,
	): Promise<ProfileEntity>;

	Update(
		connection: DatabaseClient,
		filter: ProfileRead,
		update: ProfileUpdate,
	): Promise<ProfileEntity>;

	Delete(
		connection: DatabaseClient,
		filter: ProfileRead,
	): Promise<ProfileEntity>;
}

export default IProfileRepository;
