import { z } from "zod";
import { Dto } from "../Dto";
import MessageEntity from "@source/domain/entities/Message.entity";

type MessageRead = Pick<MessageEntity, "id">;

class MessageReadDto extends Dto<MessageRead> {
	constructor(data: unknown) {
		super(
			data,
			z.object({
				id: z.string().uuid(),
			}),
		);
	}
}

export default MessageReadDto;
export type { MessageRead };
