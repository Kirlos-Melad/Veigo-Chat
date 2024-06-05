import { z } from "zod";
import { Dto } from "../Dto";
import RoomEntity from "@source/domain/entities/Room.entity";
import RoomType from "@source/domain/value-objects/RoomType";
import RoomPrivacy from "@source/domain/value-objects/RoomPrivacy";

type CreateRequestSerialized = Optional<
	Omit<RoomEntity, "id" | "createdAt" | "updatedAt">,
	"photoPath" | "description" | "privacy"
>;

class RoomCreateDto extends Dto<CreateRequestSerialized> {
	constructor(data: any) {
		super(
			data,
			z
				.object({
					photoPath: z.string().optional(),
					name: z.string(),
					description: z.string().optional(),
					type: RoomType.schema,
					privacy: RoomPrivacy.schema.optional().default("private"),
				})
				.refine(
					(data) => {
						if (data.type == "direct" && data.privacy != "private")
							return false;
						return true;
					},
					{
						message: "Direct rooms must be private",
						path: ["privacy"],
					},
				),
		);
	}
}

export default RoomCreateDto;
export type { CreateRequestSerialized };
