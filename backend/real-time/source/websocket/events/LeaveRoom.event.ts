import Event from "@source/types/Event";
import ServerManager, {
	SocketClient,
	SocketClientEvents,
} from "../SocketServer";
import Logger from "@source/utilities/Logger";

class ChatMessageEvent extends Event<SocketClientEvents, "LEAVE_ROOM"> {
	public constructor() {
		super("LEAVE_ROOM");
	}

	public listener = (connection: SocketClient, data: { name: string }) => {
		ServerManager.instance.LeaveRoom(connection, data.name);
		Logger.information(`[${connection.id}]=> Left ${data.name}`);
	};
}

export default ChatMessageEvent;
