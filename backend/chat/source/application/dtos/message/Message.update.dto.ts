import { z } from "zod";
import { Dto } from "../Dto";
import MessageEntity from "@source/domain/entities/Message.entity";

type MessageUpdate = Partial<Pick<MessageEntity, "content">>;

class MessageUpdateDto extends Dto<MessageUpdate> {
	constructor(data: unknown) {
		super(
			data,
			z.object({
				content: z.string().optional(),
			}),
		);
	}
}

export default MessageUpdateDto;
export type { MessageUpdate };
