import MessageCreateDto, {
	CreateRequestSerialized,
} from "./Message.create.dto";
import MessageReadDto, { ReadRequestSerialized } from "./Message.read.dto";
import MessageUpdateDto, {
	UpdateRequestSerialized,
} from "./Message.update.dto";

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
}

export default MessageDto;
export type {
	CreateRequestSerialized,
	ReadRequestSerialized,
	UpdateRequestSerialized,
};
