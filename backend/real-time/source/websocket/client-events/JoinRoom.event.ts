import Event from "@source/types/Event";
import Logger from "@source/utilities/Logger";
import ServerManager, {
	SocketClient,
	SocketClientEvents,
} from "../SocketServer";
import AuthorizationManager from "@root/source/utilities/AuthorizationManager";
import SocketServer from "../SocketServer";

class ChatMessageEvent extends Event<SocketClientEvents, "JOIN_ROOM"> {
	public constructor() {
		super("JOIN_ROOM");
	}

	public listener = async (
		connection: SocketClient,
		data: { name: string },
	) => {
		const userId = SocketServer.instance.GetUser(connection.id);
		if (
			!(await AuthorizationManager.instance.CanJoinRoom(
				userId,
				data.name,
			))
		)
			return connection.Send("ERROR", {
				reason: `Unauthorized to join ${data.name}`,
			});
		ServerManager.instance.JoinRoom(connection, data.name);
		Logger.information(
			`[${userId}:${connection.id}]=> Joined ${data.name}`,
		);
	};
}

export default new ChatMessageEvent();
