import { z } from "zod";
import { Dto } from "../Dto";
import ProfileEntity from "@source/domain/entities/Profile.entity";

type ProfileRead = Pick<ProfileEntity, "id">;

class ProfileReadDto extends Dto<ProfileRead> {
	constructor(data: unknown) {
		super(
			data,
			z.object({
				id: z.string().uuid(),
			}),
		);
	}
}

export default ProfileReadDto;
export type { ProfileRead };
