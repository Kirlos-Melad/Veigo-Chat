import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { absolutePath } from "@source/application/utilities/AbsolutePath";
import path from "path";

class ServerManager {
    private static _instance: ServerManager;

    private _server: grpc.Server;
    private _connection: string;
    private _credentials: grpc.ServerCredentials;

    private constructor(
        connection: string,
        credentials: grpc.ServerCredentials,
    ) {
        this._server = new grpc.Server();

        this._connection = connection;
        this._credentials = credentials;
    }

    public static createInstance(
        connection: string,
        credentials: grpc.ServerCredentials,
    ): ServerManager {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!ServerManager._instance)
            ServerManager._instance = new ServerManager(
                connection,
                credentials,
            );

        return ServerManager._instance;
    }

    public static get instance(): ServerManager {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!ServerManager._instance)
            throw new Error("ServerManager instance not created");

        return ServerManager._instance;
    }

    public async startServer(): Promise<number> {
        return new Promise((resolve, reject) => {
            this._server.bindAsync(
                this._connection,
                this._credentials,
                (error, port) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(port);
                },
            );
        });
    }

    public addService(
        protosPath: string,
        proto: {
            file: string;
            packageName: string;
            serviceName: string;
            serviceImplementation: grpc.UntypedServiceImplementation;
        },
    ): void {
        const { file, packageName, serviceName, serviceImplementation } = proto;
        const currentPath = absolutePath(import.meta.url);

        const packageDefinition = protoLoader.loadSync(
            // Resolve the given path to the current file as an absolute path
            path.resolve(
                currentPath,
                // Convert the given path to relative path to the current file
                path.relative(currentPath, `${protosPath}/${file}`),
            ),
            { includeDirs: [protosPath] },
        );
        const grpcObject = grpc.loadPackageDefinition(packageDefinition);
        const grpcPackage = grpcObject[packageName] as unknown;
        if (!grpcPackage)
            throw new Error(
                `Package ${packageName} not found in the proto file ${file}`,
            );
        else if (
            typeof grpcPackage !== "object" &&
            !Object.hasOwn(grpcPackage, serviceName)
        )
            throw new Error(
                `Service ${serviceName} not found in the package ${packageName}`,
            );

        const grpcService = grpcPackage[serviceName as keyof object] as unknown;
        if (!grpcService || !Object.hasOwn(grpcService, "service"))
            throw new Error(
                `Service ${serviceName} not found in the package ${packageName}`,
            );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this._server.addService(
            grpcService["service" as keyof object],
            serviceImplementation,
        );
    }
}

export { ServerManager };
