import { z } from "zod";
import { Dto } from "../Dto";
import MessageEntity from "@source/domain/entities/Message.entity";

type MessageCreate = Pick<MessageEntity, "roomId" | "senderId" | "content">;

class MessageCreateDto extends Dto<MessageCreate> {
	constructor(data: any) {
		super(
			data,
			z.object({
				roomId: z.string().uuid(),
				senderId: z.string().uuid(),
				content: z.string(),
			}),
		);
	}
}

export default MessageCreateDto;
export type { MessageCreate };
