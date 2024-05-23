import { createProxyMiddleware } from "http-proxy-middleware";

import Environments from "../configurations/Environments";
import Logger from "../utilities/Logger";

const WebSocketProxy = createProxyMiddleware({
	target: Environments.RT_SERVICE_CONNECTION,
	pathRewrite: {
		"^/": "", // Remove any path prefix from the request
	},
	changeOrigin: true,
	ws: true,
	on: {
		proxyReqWs: (proxyRequest, request, socket, options, head) => {
			Logger.information("Got a websocket connection");
		},
	},
});

export default WebSocketProxy;
