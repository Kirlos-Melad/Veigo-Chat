import { z } from "zod";
import { Dto } from "../Dto";
import RoomEntity from "@source/domain/entities/Room.entity";

type RoomRead = Pick<RoomEntity, "id">;

class RoomReadDto extends Dto<RoomRead> {
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
export type { RoomRead };
