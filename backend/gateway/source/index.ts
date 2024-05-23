import express from "express";
import cors from "cors";

import Logger from "./utilities/Logger.ts";
import Environments from "./configurations/Environments.ts";
import ChatService from "./grpc/services/Chat.service.ts";
import GRPCServiceManagerRegistry from "./grpc/GRPCServiceManagerRegistry.ts";
import GQLHandler from "./gql/GQLHandler.ts";
import GQLPlayground from "./gql/GQLPlayground.ts";
import WebSocketProxy from "./websocket/WebSocketProxy.ts";

const grpcServiceRegistry = GRPCServiceManagerRegistry.CreateInstance({
	Chat: ChatService,
});

Logger.information("Starting GRPC services");
await grpcServiceRegistry.Start();
Logger.information("Started GRPC services");

const app = express();

app.use(express.json());

app.use(
	cors({
		origin: "*",
		// methods: ["POST"],
		// allowedHeaders: ["Content-Type", "Authorization"],
	}),
);

app.use("ws", WebSocketProxy);

app.use("/gql", GQLHandler);

app.use("/playground", GQLPlayground({ endpoint: "/gql" }));

const server = app.listen(Environments.SERVICE_PORT, () =>
	Logger.information(
		`Server is running on port ${Environments.SERVICE_PORT}`,
	),
);

server.on("upgrade", WebSocketProxy.upgrade);
