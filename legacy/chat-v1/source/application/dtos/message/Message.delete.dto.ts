import { z } from "zod";
import { Dto } from "../Dto";
import MessageEntity from "@source/domain/entities/Message.entity";

// @ts-expect-error
type DeleteRequestSerialized = PickAs<MessageEntity, "id:messageId" | "roomId">;

class MessageDeleteDto extends Dto<DeleteRequestSerialized> {
	constructor(data: unknown) {
		super(
			data,
			z.object({
				roomId: z.string().uuid(),
				messageId: z.string().uuid(),
			}),
		);
	}
}

export default MessageDeleteDto;
export type { DeleteRequestSerialized };
