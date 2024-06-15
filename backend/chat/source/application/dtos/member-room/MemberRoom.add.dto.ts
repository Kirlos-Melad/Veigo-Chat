import { z } from "zod";
import { Dto } from "../Dto";

type AddRequestSerialized = {
	roomId: string;
	membersId: string[];
};

class MemberRoomAddDto extends Dto<AddRequestSerialized> {
	constructor(data: any) {
		super(
			data,
			z.object({
				roomId: z.string().uuid(),
				membersId: z.array(z.string().uuid()).nonempty(),
			}),
		);
	}
}

export default MemberRoomAddDto;
export type { AddRequestSerialized };
