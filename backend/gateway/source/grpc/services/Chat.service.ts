import { ProfileClient } from "@source/types/generated/protos/profile/Profile";
import { RoomClient } from "@source/types/generated/protos/room/Room";
import { MessageClient } from "@source/types/generated/protos/message/Message";
import { MemberRoomClient } from "@source/types/generated/protos/member_room/MemberRoom";
import Environments from "@source/configurations/Environments";
import GRPCServiceManager from "../GRPCServiceManager";

const PROTO_PATH = "source/types/generated/protos/definitions";

const ChatService = new GRPCServiceManager<{
	Profile: ProfileClient;
	Room: RoomClient;
	MemberRoom: MemberRoomClient;
	Message: MessageClient;
}>(
	"Chat",
	{
		Profile: `${PROTO_PATH}/Profile.proto`,
		Room: `${PROTO_PATH}/Room.proto`,
		MemberRoom: `${PROTO_PATH}/MemberRoom.proto`,
		Message: `${PROTO_PATH}/Message.proto`,
	},
	Environments.CHAT_SERVICE_CONNECTION,
	Environments.CHAT_SERVICE_CREDENTIALS,
);

export default ChatService;
