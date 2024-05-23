import { z } from "zod";
import { Dto } from "../Dto";
import UserRoomEntity from "@source/domain/entities/UserRoom.entity";

type UserRoomCreate = Pick<UserRoomEntity, "userId" | "roomId">;

class UserRoomCreateDto extends Dto<UserRoomCreate> {
	constructor(data: any) {
		super(
			data,
			z.object({
				userId: z.string().uuid(),
				roomId: z.string().uuid(),
			}),
		);
	}
}

export default UserRoomCreateDto;
export type { UserRoomCreate };
