import grpc from "@grpc/grpc-js";

import { ServerManager } from "@source/infrastructure/grpc/ServerManager";
import { environments } from "@source/configurations/Environments";
import { DatabaseManager } from "@source/infrastructure/database/DatabaseManager";
import { AuthenticationService } from "@source/application/services/Authentication.service";
import { HealthCheckService } from "@source/application/services/HealthCheck.service";
import { Logger } from "./application/utilities/Logger";
import { DateFormatter } from "./application/utilities/DateFormatter";
import { JsonWebTokenManager } from "./application/utilities/JsonWebTokenManager";
import { AuthorizationManager } from "./application/utilities/AuthorizationManager";
import { DeviceRepository } from "./infrastructure/database/repositories/Device.repository";

const logger = Logger.createInstance(new DateFormatter());

async function migrate(): Promise<void> {
    logger.information("Creating database manager");
    const databaseManager = DatabaseManager.createInstance({
        connection: environments.DATABASE_CONNECTION,
        debug: environments.IS_DEVELOPMENT,
    });

    logger.information("Running database migrations");
    await databaseManager.migrate();
}

async function start(): Promise<void> {
    logger.information("Creating database manager");
    const dbManager = DatabaseManager.createInstance({
        connection: environments.DATABASE_CONNECTION,
        debug: environments.IS_DEVELOPMENT,
    });

    const jwtManager = JsonWebTokenManager.createInstance({
        secretKey: environments.SECRET_KEY,
        ...environments.JWT_CONFIGURATION,
    });

    AuthorizationManager.createInstance({
        jwtManager: jwtManager,
        dbManager: dbManager,
        deviceRepository: new DeviceRepository(),
    });

    logger.information("Creating services");
    const serverManager = ServerManager.createInstance(
        environments.SERVICE_ADDRESS,
        grpc.ServerCredentials.createInsecure(),
    );

    const PROTOS_PATH = "source/types/generated/protos/definitions";
    serverManager.addService(PROTOS_PATH, {
        file: "health_check.proto",
        packageName: "health_check",
        serviceName: "HealthCheck",
        serviceImplementation: new HealthCheckService(),
    });

    serverManager.addService(PROTOS_PATH, {
        file: "authentication.proto",
        packageName: "authentication",
        serviceName: "Authentication",
        serviceImplementation: new AuthenticationService(),
    });

    logger.information("Starting server");
    const port = await serverManager.startServer();

    logger.information(`Server running on port ${port}`);
}

function help(): void {
    logger.information("Available commands:");
    logger.information("migrate: Run the database migrations");
    logger.information("start: Start the server");
}

try {
    if (process.argv.length < 3) {
        throw new Error(
            "No arguments provided. Try 'help' for more information.",
        );
    }

    const command = process.argv[2];

    switch (command) {
        case "migrate":
            await migrate();
            break;

        case "start":
            await start();
            break;

        case "help":
            help();
            break;

        default:
            throw new Error(
                "Invalid argument. Try 'help' for more information.",
            );
    }
} catch (error: unknown) {
    logger.error(error);
    process.exit(1);
}
