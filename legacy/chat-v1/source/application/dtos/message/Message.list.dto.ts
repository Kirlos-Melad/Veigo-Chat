import { z } from "zod";
import { Dto } from "../Dto";
import MessageEntity from "@source/domain/entities/Message.entity";
import { PaginationRequestSerialized } from "../common";

type ListRequestSerialized = Pick<MessageEntity, "roomId"> & {
	page: PaginationRequestSerialized;
};

class MessageReadDto extends Dto<ListRequestSerialized> {
	constructor(data: unknown) {
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

export default MessageReadDto;
export type { ListRequestSerialized };
