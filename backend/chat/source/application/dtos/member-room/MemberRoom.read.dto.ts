import { z } from "zod";
import { Dto } from "../Dto";
import MemberRoomEntity from "@root/source/domain/entities/MemberRoom.entity";

type MemberRoomRead = Pick<MemberRoomEntity, "memberId" | "roomId">;

class MemberRoomReadDto extends Dto<MemberRoomRead> {
	constructor(data: unknown) {
		super(
			data,
			z.object({
				memberId: z.string().uuid(),
				roomId: z.string().uuid(),
			}),
		);
	}
}

export default MemberRoomReadDto;
export type { MemberRoomRead };
