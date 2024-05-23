import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";

import AbsolutePath from "@source/utilities/AbsolutePath";

class GRPCServiceManager<T extends Record<string, grpc.Client>> {
	private mName: string;
	private mClients: T;
	private mConnection: string;
	private mCredentials: grpc.ChannelCredentials;

	constructor(
		name: string,
		clients: ValueTypeChange<T, string>,
		connection: string,
		credentials: grpc.ChannelCredentials,
	) {
		this.mName = name;
		this.mConnection = connection;
		this.mCredentials = credentials;
		this.mClients = this.InitializeClients(clients);
	}

	private InitializeClients(clients: ValueTypeChange<T, string>): T {
		const obj: Record<string, grpc.Client> = {};
		Object.entries(clients).forEach(([name, definitionPath]) => {
			obj[name] = this.AddClient(name, definitionPath);
		});

		return obj as T;
	}

	private AddClient(name: string, definitionPath: string): grpc.Client {
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

		return new servicePackage[name](this.mConnection, this.mCredentials);
	}

	public Get<U extends keyof T>(name: U): T[U] {
		return this.mClients[name];
	}

	public get name() {
		return this.mName;
	}

	async Start(): Promise<void> {
		await Promise.all(
			Object.values(this.mClients).map(
				(client) =>
					new Promise((resolve, reject) =>
						client.waitForReady(Date.now() + 5000, (error) =>
							error ? reject(error) : resolve(null),
						),
					),
			),
		);
	}
}

export default GRPCServiceManager;
