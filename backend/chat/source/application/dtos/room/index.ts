import RoomCreateDto, { RoomCreate } from "./Room.create.dto";
import RoomReadDto, { RoomRead } from "./Room.read.dto";
import RoomUpdateDto, { RoomUpdate } from "./Room.update.dto";

class RoomDto {
	public static Create(data: any) {
		return new RoomCreateDto(data);
	}

	public static Read(data: any) {
		return new RoomReadDto(data);
	}

	public static Update(data: any) {
		return new RoomUpdateDto(data);
	}
}

export default RoomDto;
export type { RoomCreate, RoomRead, RoomUpdate };
