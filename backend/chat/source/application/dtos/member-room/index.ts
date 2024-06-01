import MemberRoomCreateDto, { MemberRoomCreate } from "./MemberRoom.create.dto";
import MemberRoomReadDto, { MemberRoomRead } from "./MemberRoom.read.dto";

class MemberRoomDto {
	public static Create(data: any) {
		return new MemberRoomCreateDto(data);
	}

	public static Read(data: any) {
		return new MemberRoomReadDto(data);
	}
}

export default MemberRoomDto;
export type { MemberRoomCreate, MemberRoomRead };
