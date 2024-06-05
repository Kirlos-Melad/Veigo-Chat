import MemberRoomCreateDto, {
	CreateRequestSerialized,
} from "./MemberRoom.create.dto";
import MemberRoomReadDto, {
	ReadRequestSerialized,
} from "./MemberRoom.read.dto";

class MemberRoomDto {
	public static Create(data: any) {
		return new MemberRoomCreateDto(data);
	}

	public static Read(data: any) {
		return new MemberRoomReadDto(data);
	}
}

export default MemberRoomDto;
export type { CreateRequestSerialized, ReadRequestSerialized };
