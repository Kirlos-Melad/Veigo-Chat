import { MemberRoomHandlers } from "@source/types/generated/protos/MemberRoomPackage/MemberRoom";
import TransactionalCall from "../utilities/TransactionalCall";
import AddMemberRoomUseCase from "@root/source/domain/use-cases/member-room/Add.memberroom.usecase";
import LeaveMemberRoomUseCase from "@root/source/domain/use-cases/member-room/Leave.memberroom.usecase";
import ListMemberRoomUseCase from "@root/source/domain/use-cases/member-room/List.memberroom.usecase";

class MemberRoomService implements MemberRoomHandlers {
	[name: string]: import("@grpc/grpc-js").UntypedHandleCall;

	Add = TransactionalCall(
		AddMemberRoomUseCase.Serializer,
		AddMemberRoomUseCase.Authorize,
		AddMemberRoomUseCase.Handle,
	);

	List = TransactionalCall(
		ListMemberRoomUseCase.Serializer,
		ListMemberRoomUseCase.Authorize,
		ListMemberRoomUseCase.Handle,
	);

	Leave = TransactionalCall(
		LeaveMemberRoomUseCase.Serializer,
		LeaveMemberRoomUseCase.Authorize,
		LeaveMemberRoomUseCase.Handle,
	);
}

export default new MemberRoomService();
