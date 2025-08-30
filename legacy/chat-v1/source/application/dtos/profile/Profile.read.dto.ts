import { z } from "zod";
import { Dto } from "../Dto";
import ProfileEntity from "@source/domain/entities/Profile.entity";

type ReadRequestSerialized = Pick<ProfileEntity, "id">;

class ProfileReadDto extends Dto<ReadRequestSerialized> {
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
export type { ReadRequestSerialized };
