import MessageCreateDto, {
	CreateRequestSerialized,
} from "./Message.create.dto";
import MessageReadDto, { ReadRequestSerialized } from "./Message.read.dto";
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

	public static Read(data: any) {
		return new MessageReadDto(data);
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
	ReadRequestSerialized,
	UpdateRequestSerialized,
	DeleteRequestSerialized,
};
