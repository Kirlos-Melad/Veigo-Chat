import MessageCreateDto, {
	CreateRequestSerialized,
} from "./Message.create.dto";
import MessageListDto, { ListRequestSerialized } from "./Message.list.dto";
import MessageUpdateDto, {
	UpdateRequestSerialized,
} from "./Message.update.dto";
import MessageDeleteDto, {
	DeleteRequestSerialized,
} from "./Message.delete.dto";

class MessageDto {
	public static Create(data: any) {
		return new MessageCreateDto(data);
	}

	public static List(data: any) {
		return new MessageListDto(data);
	}

	public static Update(data: any) {
		return new MessageUpdateDto(data);
	}

	public static Delete(data: any) {
		return new MessageDeleteDto(data);
	}
}

export default MessageDto;
export type {
	CreateRequestSerialized,
	ListRequestSerialized,
	UpdateRequestSerialized,
	DeleteRequestSerialized,
};
