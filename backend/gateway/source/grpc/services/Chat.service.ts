import { ProfileClient } from "@source/types/generated/protos/chat/ProfilePackage/Profile";
import { RoomClient } from "@source/types/generated/protos/chat/RoomPackage/Room";
import { UserRoomClient } from "@source/types/generated/protos/chat/UserRoomPackage/UserRoom";
import { MessageClient } from "@source/types/generated/protos/chat/MessagePackage/Message";
import Environments from "@source/configurations/Environments";
import GRPCServiceManager from "../GRPCServiceManager";

const ChatService = new GRPCServiceManager<{
	Profile: ProfileClient;
	Room: RoomClient;
	UserRoom: UserRoomClient;
	Message: MessageClient;
}>(
	"Chat",
	{
		Profile: "source/types/generated/protos/chat/definitions/Profile.proto",
		Room: "source/types/generated/protos/chat/definitions/Room.proto",
		UserRoom:
			"source/types/generated/protos/chat/definitions/UserRoom.proto",
		Message: "source/types/generated/protos/chat/definitions/Message.proto",
	},
	Environments.CHAT_SERVICE_CONNECTION,
	Environments.CHAT_SERVICE_CREDENTIALS,
);

export default ChatService;
