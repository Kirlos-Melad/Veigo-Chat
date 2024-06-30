import { RoomHandlers } from "@source/types/generated/protos/room/Room";
import TransactionalCall from "../utilities/TransactionalCall";
import CreateRoomUseCase from "@source/domain/use-cases/rooms/Create.room.usecase";
import ListRoomUseCase from "@source/domain/use-cases/rooms/List.room.usecase";
import UpdateRoomUseCase from "@source/domain/use-cases/rooms/Update.room.usecase";

class RoomService implements RoomHandlers {
	[name: string]: import("@grpc/grpc-js").UntypedHandleCall;

	Create = TransactionalCall(
		CreateRoomUseCase.Serializer,
		CreateRoomUseCase.Authorize,
		CreateRoomUseCase.Handle,
	);

	List = TransactionalCall(
		ListRoomUseCase.Serializer,
		ListRoomUseCase.Authorize,
		ListRoomUseCase.Handle,
	);

	Update = TransactionalCall(
		UpdateRoomUseCase.Serializer,
		UpdateRoomUseCase.Authorize,
		UpdateRoomUseCase.Handle,
	);
}

export default new RoomService();
