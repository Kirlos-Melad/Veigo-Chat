import RoomCreateDto, { CreateRequestSerialized } from "./Room.create.dto";
import RoomReadDto, { ReadRequestSerialized } from "./Room.read.dto";
import RoomUpdateDto, { UpdateRequestSerialized } from "./Room.update.dto";

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
export type {
	CreateRequestSerialized,
	ReadRequestSerialized,
	UpdateRequestSerialized,
};
