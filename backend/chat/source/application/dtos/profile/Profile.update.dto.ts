import { z } from "zod";
import { Dto } from "../Dto";
import ProfileEntity from "@source/domain/entities/Profile.entity";

type ProfileUpdate = Partial<
	Pick<ProfileEntity, "photoPath" | "name" | "about">
>;

class ProfileUpdateDto extends Dto<ProfileUpdate> {
	constructor(data: unknown) {
		super(
			data,
			z.object({
				photoPath: z.string().optional(),
				name: z.string().optional(),
				about: z.string().optional(),
			}),
		);
	}
}

export default ProfileUpdateDto;
export type { ProfileUpdate };
