import { z } from "zod";
import { Dto } from "../Dto";
import ProfileEntity from "@source/domain/entities/Profile.entity";

type UpdateRequestSerialized = Partial<
	Pick<ProfileEntity, "photoPath" | "name" | "about">
> &
	Pick<ProfileEntity, "id">;

class ProfileUpdateDto extends Dto<UpdateRequestSerialized> {
	constructor(data: unknown) {
		super(
			data,
			z.object({
				id: z.string(),
				photoPath: z.string().optional(),
				name: z.string().optional(),
				about: z.string().optional(),
			}),
		);
	}
}

export default ProfileUpdateDto;
export type { UpdateRequestSerialized };
