import ProfileCreateDto, { ProfileCreate } from "./Profile.create.dto";
import ProfileReadDto, { ProfileRead } from "./Profile.read.dto";
import ProfileUpdateDto, { ProfileUpdate } from "./Profile.update.dto";

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
}

export default ProfileDto;
export type { ProfileCreate, ProfileRead, ProfileUpdate };
