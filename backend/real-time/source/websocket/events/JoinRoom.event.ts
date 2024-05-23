import Event from "@source/types/Event";
import Logger from "@source/utilities/Logger";
import ServerManager, {
	SocketClient,
	SocketClientEvents,
} from "../SocketServer";

class ChatMessageEvent extends Event<SocketClientEvents, "JOIN_ROOM"> {
	public constructor() {
		super("JOIN_ROOM");
	}

	public listener = (connection: SocketClient, data: { name: string }) => {
		ServerManager.instance.JoinRoom(connection, data.name);
		Logger.information(`[${connection.id}]=> Joined ${data.name}`);
	};
}

export default ChatMessageEvent;
