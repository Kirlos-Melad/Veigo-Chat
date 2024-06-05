import { z } from "zod";
import { Dto } from "../Dto";
import MemberRoomEntity from "@root/source/domain/entities/MemberRoom.entity";

type ReadRequestSerialized = Pick<MemberRoomEntity, "memberId" | "roomId">;

class MemberRoomReadDto extends Dto<ReadRequestSerialized> {
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
export type { ReadRequestSerialized };
