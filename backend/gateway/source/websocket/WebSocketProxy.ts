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

				return proxyRequest.destroy(new Error(stringifiedError));
			}
		},
	},
});

export default WebSocketProxy;
