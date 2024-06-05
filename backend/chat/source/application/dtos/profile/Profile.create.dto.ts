import { z } from "zod";
import { Dto } from "../Dto";
import ProfileEntity from "@source/domain/entities/Profile.entity";

type CreateRequestSerialized = Optional<
	Pick<ProfileEntity, "photoPath" | "name" | "about">,
	"about" | "photoPath"
>;

class ProfileCreateDto extends Dto<CreateRequestSerialized> {
	constructor(data: any) {
		super(
			data,
			z.object({
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
export type { CreateRequestSerialized };
