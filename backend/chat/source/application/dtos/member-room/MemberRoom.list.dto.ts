import { z } from "zod";
import { Dto } from "../Dto";
import MemberRoomEntity from "@source/domain/entities/MemberRoom.entity";
import { PaginationRequestSerialized } from "../common";

type ListRequestSerialized = Pick<MemberRoomEntity, "roomId"> & {
	page: PaginationRequestSerialized;
};

class MemberRoomListDto extends Dto<ListRequestSerialized> {
	constructor(data: any) {
		super(
			data,
			z.object({
				roomId: z.string().uuid(),
				page: z.object({
					cursor: z.string().optional(),
					size: z.number().optional().default(25),
				}),
			}),
		);
	}
}

export default MemberRoomListDto;
export type { ListRequestSerialized };
