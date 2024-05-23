import { z } from "zod";
import { Dto } from "../Dto";
import UserRoomEntity from "@source/domain/entities/UserRoom.entity";

type UserRoomRead = Pick<UserRoomEntity, "userId" | "roomId">;

class UserRoomReadDto extends Dto<UserRoomRead> {
	constructor(data: unknown) {
		super(
			data,
			z.object({
				userId: z.string().uuid(),
				roomId: z.string().uuid(),
			}),
		);
	}
}

export default UserRoomReadDto;
export type { UserRoomRead };
