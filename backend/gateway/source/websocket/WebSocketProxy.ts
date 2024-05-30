import { createProxyMiddleware } from "http-proxy-middleware";

import Environments from "../configurations/Environments";
import Logger from "../utilities/Logger";
import Authorize from "../utilities/Authorize";
import ErrorSerializer from "../utilities/SerializeError";

const WebSocketProxy = createProxyMiddleware({
	target: Environments.RT_SERVICE_CONNECTION,
	changeOrigin: true,
	ws: true,
	on: {
		proxyReqWs: async (proxyRequest, request, socket, options, head) => {
			try {
				if (!request.url) throw new Error("Invalid URL");
				const url = new URL(
					request.url,
					`http://${request.headers.host}`,
				);

				await Authorize(url.searchParams.get("token"));
			} catch (error) {
				const errorSerializer = new ErrorSerializer(error);
				errorSerializer.Serialize();
				const stringifiedError = JSON.stringify(
					errorSerializer.serializedError,
				);

				const responseHeaders = [
					"HTTP/1.1 401 Unauthorized",
					"Content-Type: application/json",
					"Content-Length: " + Buffer.byteLength(stringifiedError),
					"Connection: close",
				];
				const response =
					responseHeaders.join("\r\n") +
					"\r\n\r\n" +
					stringifiedError;
				socket.write(response, (err) => {
					if (err) Logger.warning("Writing socket error failed", err);
					socket.destroy();
				});
				return;
			}
		},
	},
});

export default WebSocketProxy;
