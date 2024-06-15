import { ProfileClient } from "@source/types/generated/protos/chat/ProfilePackage/Profile";
import { RoomClient } from "@source/types/generated/protos/chat/RoomPackage/Room";
import { MessageClient } from "@source/types/generated/protos/chat/MessagePackage/Message";
import Environments from "@source/configurations/Environments";
import GRPCServiceManager from "../GRPCServiceManager";
import { MemberRoomClient } from "@root/source/types/generated/protos/chat/MemberRoomPackage/MemberRoom";

const ChatService = new GRPCServiceManager<{
	Profile: ProfileClient;
	Room: RoomClient;
	MemberRoom: MemberRoomClient;
	Message: MessageClient;
}>(
	"Chat",
	{
		Profile: "source/types/generated/protos/chat/definitions/Profile.proto",
		Room: "source/types/generated/protos/chat/definitions/Room.proto",
		MemberRoom:
			"source/types/generated/protos/chat/definitions/MemberRoom.proto",
		Message: "source/types/generated/protos/chat/definitions/Message.proto",
	},
	Environments.CHAT_SERVICE_CONNECTION,
	Environments.CHAT_SERVICE_CREDENTIALS,
);

export default ChatService;
