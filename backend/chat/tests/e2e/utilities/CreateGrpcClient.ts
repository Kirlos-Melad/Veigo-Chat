import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import AbsolutePath from "@source/application/utilities/AbsolutePath";
import Environments from "@source/configurations/Environments";

function CreateGrpcClient<T>(
	protoPath: string,
	packageName: string,
	serviceName: string,
): T {
	const currentPath = AbsolutePath(import.meta.url);

	const packageDefinition = protoLoader.loadSync(
		// Resolve the given path to the current file as an absolute path
		path.resolve(
			currentPath,
			// Convert the given path to relative path to the current file
			path.relative(currentPath, protoPath),
		),
		{},
	);
	const packageObject = grpc.loadPackageDefinition(packageDefinition);
	const ClientConstructor = (packageObject[packageName] as any)[
		serviceName
	] as grpc.ServiceClientConstructor;

	if (!ClientConstructor) {
		throw new Error(
			`Client ${packageName}.${serviceName} not found in proto definitions.`,
		);
	}

	const client = new ClientConstructor(
		Environments.SERVICE_ADDRESS,
		grpc.credentials.createInsecure(),
	) as T;

	return client;
}

export default CreateGrpcClient;
