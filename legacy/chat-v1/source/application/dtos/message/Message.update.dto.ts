import { z } from "zod";
import { Dto } from "../Dto";
import MessageEntity from "@source/domain/entities/Message.entity";

type UpdateRequestSerialized = Partial<Pick<MessageEntity, "content">> &
	// @ts-expect-error
	PickAs<MessageEntity, "id:messageId" | "roomId">;

class MessageUpdateDto extends Dto<UpdateRequestSerialized> {
	constructor(data: unknown) {
		super(
			data,
			z.object({
				roomId: z.string().uuid(),
				messageId: z.string().uuid(),
				content: z.string().optional(),
			}),
		);
	}
}

export default MessageUpdateDto;
export type { UpdateRequestSerialized };
