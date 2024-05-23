import http from "http";

import Environments from "./configurations/Environments";
import Logger from "./utilities/Logger";
import KafkaConsumer from "./kafka/KafkaConsumer";
import SocketServer from "./websocket/SocketServer";

const kafkaConsumer = new KafkaConsumer({
	groupId: Environments.KAFKA_GROUP_ID,
	clientId: Environments.KAFKA_CLIENT_ID,
	brokers: Environments.KAFKA_BROKERS,
});

Logger.information("Loading Kafka Consumer Events");
await kafkaConsumer.LoadEvents();
Logger.information("Connecting to Kafka");
await kafkaConsumer.Start();

const httpServer = http.createServer();

const socketServer = SocketServer.CreateInstance({ httpServer: httpServer });

Logger.information("Loading Socket Server Events");
await socketServer.LoadEvents();

Logger.information("Starting Socket Server");
httpServer.listen(Environments.SERVICE_PORT, () =>
	Logger.information(
		`Server is running on port ${Environments.SERVICE_PORT}`,
	),
);
