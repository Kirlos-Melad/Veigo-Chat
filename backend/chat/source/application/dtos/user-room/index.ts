import UserRoomCreateDto, { UserRoomCreate } from "./UserRoom.create.dto";
import UserRoomReadDto, { UserRoomRead } from "./UserRoom.read.dto";

class UserRoomDto {
	public static Create(data: any) {
		return new UserRoomCreateDto(data);
	}

	public static Read(data: any) {
		return new UserRoomReadDto(data);
	}
}

export default UserRoomDto;
export type { UserRoomCreate, UserRoomRead };
