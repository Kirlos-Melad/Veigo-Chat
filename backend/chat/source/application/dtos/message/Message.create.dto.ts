import { z } from "zod";
import { Dto } from "../Dto";
import MessageEntity from "@source/domain/entities/Message.entity";

type CreateRequestSerialized = Pick<MessageEntity, "roomId" | "content">;

class MessageCreateDto extends Dto<CreateRequestSerialized> {
	constructor(data: any) {
		super(
			data,
			z.object({
				roomId: z.string().uuid(),
				content: z.string(),
			}),
		);
	}
}

export default MessageCreateDto;
export type { CreateRequestSerialized };
