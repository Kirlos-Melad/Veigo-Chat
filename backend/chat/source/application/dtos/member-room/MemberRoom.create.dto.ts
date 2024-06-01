import { z } from "zod";
import { Dto } from "../Dto";
import MemberRoomEntity from "@root/source/domain/entities/MemberRoom.entity";

type MemberRoomCreate = Pick<MemberRoomEntity, "memberId" | "roomId">;

class MemberRoomCreateDto extends Dto<MemberRoomCreate> {
	constructor(data: any) {
		super(
			data,
			z.object({
				memberId: z.string().uuid(),
				roomId: z.string().uuid(),
			}),
		);
	}
}

export default MemberRoomCreateDto;
export type { MemberRoomCreate };
