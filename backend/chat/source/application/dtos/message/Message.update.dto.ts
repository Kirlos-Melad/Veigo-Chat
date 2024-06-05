import { z } from "zod";
import { Dto } from "../Dto";
import MessageEntity from "@source/domain/entities/Message.entity";

type UpdateRequestSerialized = Partial<Pick<MessageEntity, "content">> &
	Pick<MessageEntity, "id">;

class MessageUpdateDto extends Dto<UpdateRequestSerialized> {
	constructor(data: unknown) {
		super(
			data,
			z.object({
				id: z.string().uuid(),
				content: z.string().optional(),
			}),
		);
	}
}

export default MessageUpdateDto;
export type { UpdateRequestSerialized };
