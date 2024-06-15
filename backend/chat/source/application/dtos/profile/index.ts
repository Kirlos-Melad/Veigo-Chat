import ProfileCreateDto, {
	CreateRequestSerialized,
} from "./Profile.create.dto";
import ProfileReadDto, { ReadRequestSerialized } from "./Profile.read.dto";
import ProfileUpdateDto, {
	UpdateRequestSerialized,
} from "./Profile.update.dto";
import ProfileDeleteDto, { DeleteRequestSerialized } from "./Profile.delete.dto";

class ProfileDto {
	public static Create(data: any) {
		return new ProfileCreateDto(data);
	}

	public static Read(data: any) {
		return new ProfileReadDto(data);
	}

	public static Update(data: any) {
		return new ProfileUpdateDto(data);
	}

	public static Delete(data: any) {
		return new ProfileDeleteDto(data);
	}
}

export default ProfileDto;
export type {
	CreateRequestSerialized,
	ReadRequestSerialized,
	UpdateRequestSerialized,
	DeleteRequestSerialized,
};
