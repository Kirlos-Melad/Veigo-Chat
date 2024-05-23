import { z } from "zod";
import { Dto } from "../Dto";
import RoomEntity from "@source/domain/entities/Room.entity";
import RoomPrivacy from "@source/domain/value-objects/RoomPrivacy";

type RoomUpdate = Partial<
	Pick<RoomEntity, "photoPath" | "name" | "description" | "privacy">
>;

class RoomUpdateDto extends Dto<RoomUpdate> {
	constructor(data: unknown) {
		super(
			data,
			z.object({
				photoPath: z.string().optional(),
				name: z.string().optional(),
				description: z.string().optional(),
				privacy: RoomPrivacy.schema.optional(),
			}),
		);
	}
}

export default RoomUpdateDto;
export type { RoomUpdate };
