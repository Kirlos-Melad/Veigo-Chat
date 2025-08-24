import { Context } from "mocha";
import {
    Network,
    GenericContainer,
    StartedTestContainer,
    StartedNetwork,
} from "testcontainers";

declare module "mocha" {
    export interface Context {
        containers: {
            network: StartedNetwork;
            db: StartedTestContainer;
            api: StartedTestContainer;
        };
    }
}

const timeOut = 10 * 60;

export const mochaHooks = {
    async beforeAll(this: Context): Promise<void> {
        this.timeout(`${timeOut}s`);

        console.log("RootHooks: Starting containers");

        const network = await new Network().start();

        const dbPort = 5432;
        const dbEnv = {
            POSTGRES_USER: "user",
            POSTGRES_PASSWORD: "password",
            POSTGRES_DB: "postgres",
        };
        const db = await new GenericContainer("postgres:16.3-alpine")
            .withExposedPorts(dbPort)
            .withEnvironment(dbEnv)
            .withNetwork(network)
            .start();

        const apiPort = 4334;
        const apiEnv = {
            SECRET_KEY: "4ubHcOVt6IFtq8dWQBoXUgA27eHVcLay",
            SERVICE_ADDRESS: `0.0.0.0:${apiPort}`,
            JWT_CONFIGURATION: JSON.stringify({
                algorithm: "A256KW",
                encryption: "A256GCM",
                issuer: "SuperDoperAuthService",
                duration: { amount: 1, unit: "hours" },
            }),
            DATABASE_CONNECTION: `postgres://${dbEnv.POSTGRES_USER}:${dbEnv.POSTGRES_PASSWORD}@${db.getName().slice(1)}:${dbPort}/${dbEnv.POSTGRES_DB}`,
        };
        const api = await (
            await GenericContainer.fromDockerfile(process.cwd()).build()
        )
            .withExposedPorts(apiPort)
            .withNetwork(network)
            .withEnvironment(apiEnv)
            .start();

        this.containers = {
            network,
            db,
            api,
        };

        console.log("RootHooks: Containers started\n\n\n\n");
    },

    async afterAll(this: Context): Promise<void> {
        this.timeout(`${timeOut}s`);

        console.log("\n\n\n\nRootHooks: Stopping containers");

        await this.containers.api.stop();
        await this.containers.db.stop();
        await this.containers.network.stop();

        console.log("RootHooks: Containers stopped");
    },
};
