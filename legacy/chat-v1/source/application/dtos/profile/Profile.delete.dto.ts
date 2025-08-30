import { z } from "zod";
import { Dto } from "../Dto";
import ProfileEntity from "@source/domain/entities/Profile.entity";

type DeleteRequestSerialized = Pick<ProfileEntity, "id">;

class ProfileDeleteDto extends Dto<DeleteRequestSerialized> {
	constructor(data: unknown) {
		super(
			data,
			z.object({
				id: z.string().uuid(),
			}),
		);
	}
}

export default ProfileDeleteDto;
export type { DeleteRequestSerialized };
