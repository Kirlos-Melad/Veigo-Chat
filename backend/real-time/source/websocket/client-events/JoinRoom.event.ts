import Event from "@source/types/Event";
import Logger from "@source/utilities/Logger";
import ServerManager, {
	SocketClient,
	SocketClientEvents,
} from "../SocketServer";
import AuthorizationManager from "@source/utilities/AuthorizationManager";
import SocketServer from "../SocketServer";

class ChatMessageEvent extends Event<SocketClientEvents, "JOIN_ROOM"> {
	public constructor() {
		super("JOIN_ROOM");
	}

	public listener = async (
		connection: SocketClient,
		data: { id: string },
	) => {
		// if (
		// 	!(await AuthorizationManager.instance.CanJoinRoom(
		// 		connection.userId,
		// 		data.id,
		// 	))
		// )
		// 	return connection.Send("ERROR", {
		// 		reason: `Unauthorized to join ${data.name}`,
		// 	});
		ServerManager.instance.JoinRoom(connection, data.id);
		Logger.information(
			`[${connection.userId}:${connection.id}]=> Joined ${data.id}`,
		);
	};
}

export default new ChatMessageEvent();
