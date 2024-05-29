import { createProxyMiddleware } from "http-proxy-middleware";

import Environments from "../configurations/Environments";
import Logger from "../utilities/Logger";
import Authorize from "../utilities/Authorize";

const WebSocketProxy = createProxyMiddleware({
	target: Environments.RT_SERVICE_CONNECTION,
	pathRewrite: {
		"^/": "", // Remove any path prefix from the request
	},
	changeOrigin: true,
	ws: true,
	on: {
		proxyReqWs: async (proxyRequest, request, socket, options, head) => {
			try {
				await Authorize(request.headers["sec-websocket-protocol"]);
			} catch (error: any) {
				const responseHeaders = [
					"HTTP/1.1 401 Unauthorized",
					"Content-Type: text/plain",
					"Content-Length: " + Buffer.byteLength(error.message),
					"Connection: close",
				];
				const response =
					responseHeaders.join("\r\n") + "\r\n\r\n" + error.message;
				socket.write(response, (err) => {
					if (err) Logger.warning(err);
					socket.destroy();
				});
				return;
			}
		},
	},
});

export default WebSocketProxy;
