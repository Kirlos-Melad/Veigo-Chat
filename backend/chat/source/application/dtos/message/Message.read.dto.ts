import { z } from "zod";
import { Dto } from "../Dto";
import MessageEntity from "@source/domain/entities/Message.entity";

type ReadRequestSerialized = Pick<MessageEntity, "roomId">;

class MessageReadDto extends Dto<ReadRequestSerialized> {
	constructor(data: unknown) {
		super(
			data,
			z.object({
				roomId: z.string().uuid(),
			}),
		);
	}
}

export default MessageReadDto;
export type { ReadRequestSerialized };
