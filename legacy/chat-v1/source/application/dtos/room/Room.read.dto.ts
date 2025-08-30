import { z } from "zod";
import { Dto } from "../Dto";
import RoomEntity from "@source/domain/entities/Room.entity";

type ReadRequestSerialized = Pick<RoomEntity, "id">;

class RoomReadDto extends Dto<ReadRequestSerialized> {
	constructor(data: unknown) {
		super(
			data,
			z.object({
				id: z.string().uuid(),
			}),
		);
	}
}

export default RoomReadDto;
export type { ReadRequestSerialized };
