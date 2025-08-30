import MemberRoomAddDto, { AddRequestSerialized } from "./MemberRoom.add.dto";
import MemberRoomListDto, {
	ListRequestSerialized,
} from "./MemberRoom.list.dto";
import MemberRoomLeaveDto, {
	LeaveRequestSerialized,
} from "./MemberRoom.leave.dto";

class MemberRoomDto {
	public static Add(data: any) {
		return new MemberRoomAddDto(data);
	}

	public static List(data: any) {
		return new MemberRoomListDto(data);
	}

	public static Leave(data: any) {
		return new MemberRoomLeaveDto(data);
	}
}

export default MemberRoomDto;
export type {
	AddRequestSerialized,
	ListRequestSerialized,
	LeaveRequestSerialized,
};
