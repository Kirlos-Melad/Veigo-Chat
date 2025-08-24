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

	public listener = (connection: SocketClient, data: { id: string }) => {
		ServerManager.instance.LeaveRoom(connection, data.id);
		Logger.information(
			`[${connection.userId}${connection.id}]=> Left ${data.id}`,
		);
	};
}

export default new ChatMessageEvent();
