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
		protosPath: string,
		proto: {
			file: string;
			packageName: string;
			serviceName: string;
			serviceImplementation: grpc.UntypedServiceImplementation;
		},
	) {
		const { file, packageName, serviceName, serviceImplementation } = proto;
		const currentPath = AbsolutePath(import.meta.url);

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
		const grpcPackage = grpcObject[packageName] as any;
		if (!grpcPackage)
			throw new Error(
				`Package ${packageName} not found in the proto file ${file}`,
			);

		const grpcService = grpcPackage[serviceName] as any;
		if (!grpcService || !grpcService.service)
			throw new Error(
				`Service ${serviceName} not found in the package ${packageName}`,
			);

		this.mServer.addService(grpcService.service, serviceImplementation);
	}
}

export default ServerManager;
