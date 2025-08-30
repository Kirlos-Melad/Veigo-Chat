import { z } from "zod";
import { Dto } from "../Dto";
import RoomEntity from "@source/domain/entities/Room.entity";

//@ts-expect-error
type LeaveRequestSerialized = PickAs<RoomEntity, "id:roomId">;

class MemberRoomLeaveDto extends Dto<LeaveRequestSerialized> {
	constructor(data: unknown) {
		super(
			data,
			z.object({
				roomId: z.string().uuid(),
			}),
		);
	}
}

export default MemberRoomLeaveDto;
export type { LeaveRequestSerialized };
