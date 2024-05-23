import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import AbsolutePath from "@source/application/utilities/AbsolutePath";
import path from "path";

class ServerManager {
	private static sInstance: ServerManager;

	private mServer: grpc.Server;
	private mConnection: string;
	private mCredentials: grpc.ServerCredentials;

	private constructor(
		connection: string,
		credentials: grpc.ServerCredentials,
	) {
		this.mServer = new grpc.Server();

		this.mConnection = connection;
		this.mCredentials = credentials;
	}

	public static CreateInstance(
		connection: string,
		credentials: grpc.ServerCredentials,
	): ServerManager {
		if (ServerManager.sInstance) return ServerManager.sInstance;

		ServerManager.sInstance = new ServerManager(connection, credentials);

		return ServerManager.sInstance;
	}

	public static get instance(): ServerManager {
		if (!ServerManager.sInstance) throw new Error("Instance not created");

		return ServerManager.sInstance;
	}

	public async StartServer(): Promise<number> {
		return new Promise((resolve, reject) => {
			this.mServer.bindAsync(
				this.mConnection,
				this.mCredentials,
				(error, port) => {
					if (error) return reject(error);
					return resolve(port);
				},
			);
		});
	}

	public AddService(
		definitionPath: string,
		implementation: grpc.UntypedServiceImplementation,
	) {
		const currentPath = AbsolutePath(import.meta.url);

		const packageDefinition = protoLoader.loadSync(
			// Resolve the given path to the current file as an absolute path
			path.resolve(
				currentPath,
				// Convert the given path to relative path to the current file
				path.relative(currentPath, definitionPath),
			),
			{},
		);
		const grpcObject = grpc.loadPackageDefinition(packageDefinition);
		const packageName = Object.keys(grpcObject)[0];
		const servicePackage = grpcObject[packageName] as any;

		for (const key in servicePackage) {
			if (servicePackage[key].service) {
				this.mServer.addService(
					servicePackage[key].service,
					implementation,
				);
			}
		}
	}
}

export default ServerManager;
