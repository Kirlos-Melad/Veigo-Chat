import { MemberRoomHandlers } from "@source/types/generated/protos/MemberRoomPackage/MemberRoom";
import TransactionalCall from "../utilities/TransactionalCall";
import ReadMemberRoomUseCase from "@root/source/domain/use-cases/member-room/Read.memberroom.usecase";
import DeleteMemberRoomUseCase from "@root/source/domain/use-cases/member-room/Delete.memberroom.usecase";
import CreateMemberRoomUseCase from "@root/source/domain/use-cases/member-room/Create.memberroom.usecase";

class MemberRoomService implements MemberRoomHandlers {
	[name: string]: import("@grpc/grpc-js").UntypedHandleCall;

	Create = TransactionalCall(
		CreateMemberRoomUseCase.Serializer,
		CreateMemberRoomUseCase.Authorize,
		CreateMemberRoomUseCase.Handle,
	);
	Read = TransactionalCall(
		ReadMemberRoomUseCase.Serializer,
		ReadMemberRoomUseCase.Authorize,
		ReadMemberRoomUseCase.Handle,
	);
	Delete = TransactionalCall(
		DeleteMemberRoomUseCase.Serializer,
		DeleteMemberRoomUseCase.Authorize,
		DeleteMemberRoomUseCase.Handle,
	);
}

export default new MemberRoomService();
