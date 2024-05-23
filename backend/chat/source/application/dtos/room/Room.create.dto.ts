import { z } from "zod";
import { Dto } from "../Dto";
import RoomEntity from "@source/domain/entities/Room.entity";
import RoomType from "@source/domain/value-objects/RoomType";
import RoomPrivacy from "@source/domain/value-objects/RoomPrivacy";

type RoomCreate = Optional<
	Omit<RoomEntity, "id" | "createdAt" | "updatedAt">,
	"privacy" | "description"
>;

class RoomCreateDto extends Dto<RoomCreate> {
	constructor(data: any) {
		super(
			data,
			z.object({
				photoPath: z.string(),
				name: z.string(),
				description: z.string().optional(),
				type: RoomType.schema,
				privacy: RoomPrivacy.schema.optional().default("private"),
			}),
		);
	}
}

export default RoomCreateDto;
export type { RoomCreate };
