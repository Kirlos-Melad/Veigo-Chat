import { z } from "zod";
import { Dto } from "../Dto";
import ProfileEntity from "@source/domain/entities/Profile.entity";

type ProfileCreate = Optional<
	Pick<ProfileEntity, "id" | "photoPath" | "name" | "about">,
	"about" | "photoPath"
>;

class ProfileCreateDto extends Dto<ProfileCreate> {
	constructor(data: any) {
		super(
			data,
			z.object({
				id: z.string().uuid(),
				name: z.string(),
				photoPath: z.string().optional(),
				about: z
					.string()
					.optional()
					.default("Hello there i'm using Veigo Chat"),
			}),
		);
	}
}

export default ProfileCreateDto;
export type { ProfileCreate };
