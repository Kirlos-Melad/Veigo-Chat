import { RoomHandlers } from "@source/types/generated/protos/RoomPackage/Room";
import TransactionalCall from "../utilities/TransactionalCall";
import CreateRoomUseCase from "@root/source/domain/use-cases/rooms/Create.room.usecase";
import ReadRoomUseCase from "@root/source/domain/use-cases/rooms/Read.room.usecase";
import UpdateRoomUseCase from "@root/source/domain/use-cases/rooms/Update.room.usecase";
import DeleteRoomUseCase from "@root/source/domain/use-cases/rooms/Delete.room.usecase";

class RoomService implements RoomHandlers {
	[name: string]: import("@grpc/grpc-js").UntypedHandleCall;

	Create = TransactionalCall(
		CreateRoomUseCase.Serializer,
		CreateRoomUseCase.Authorize,
		CreateRoomUseCase.Handle,
	);

	Read = TransactionalCall(
		ReadRoomUseCase.Serializer,
		ReadRoomUseCase.Authorize,
		ReadRoomUseCase.Handle,
	);

	Update = TransactionalCall(
		UpdateRoomUseCase.Serializer,
		UpdateRoomUseCase.Authorize,
		UpdateRoomUseCase.Handle,
	);

	Delete = TransactionalCall(
		DeleteRoomUseCase.Serializer,
		DeleteRoomUseCase.Authorize,
		DeleteRoomUseCase.Handle,
	);
}

export default new RoomService();
