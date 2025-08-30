import { MemberRoomHandlers } from "@source/types/generated/protos/member_room/MemberRoom";
import TransactionalCall from "../utilities/TransactionalCall";
import AddMemberRoomUseCase from "@source/domain/use-cases/member-room/Add.memberroom.usecase";
import LeaveMemberRoomUseCase from "@source/domain/use-cases/member-room/Leave.memberroom.usecase";
import ListMemberRoomUseCase from "@source/domain/use-cases/member-room/List.memberroom.usecase";

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
