import { z } from "zod";
import { Dto } from "../Dto";
import RoomEntity from "@source/domain/entities/Room.entity";
import RoomPrivacy from "@source/domain/value-objects/RoomPrivacy";

type UpdateRequestSerialized = Partial<
	Omit<RoomEntity, "type" | "createdAt" | "updatedAt">
> & { id: string };

class RoomUpdateDto extends Dto<UpdateRequestSerialized> {
	constructor(data: unknown) {
		super(
			data,
			z.object({
				id: z.string(),
				photoPath: z.string().optional(),
				name: z.string().optional(),
				description: z.string().optional(),
				privacy: RoomPrivacy.schema.optional(),
			}),
		);
	}
}

export default RoomUpdateDto;
export type { UpdateRequestSerialized };
