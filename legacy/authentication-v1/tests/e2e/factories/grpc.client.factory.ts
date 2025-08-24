import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";
import path from "path";

import { absolutePath } from "@source/application/utilities/AbsolutePath";

/**
 * Load the gRPC package definition from a .proto file
 * @param protoPath - The path to the .proto file
 * @returns The loaded gRPC package definition
 */
function loadProto(protoPath: string): GrpcObject {
    const currentPath = absolutePath(import.meta.url);
    const resolvedPath = path.resolve(
        currentPath,
        path.relative(currentPath, protoPath),
    );

    const packageDefinition: protoLoader.PackageDefinition =
        protoLoader.loadSync(resolvedPath, {});
    return grpc.loadPackageDefinition(packageDefinition);
}

/**
 * Create a gRPC client
 * @param protoPath - The path to the .proto file
 * @param packageName - The package name in the .proto file
 * @param serviceName - The service name in the .proto file
 * @param address - The address of the gRPC server
 * @returns The gRPC client
 */
function grpcClientFactory<T>(
    protoPath: string,
    packageName: string,
    serviceName: string,
    address: string,
): T {
    const proto = loadProto(protoPath);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const serviceConstructor =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        (proto[packageName] as any)[serviceName] as
            | ServiceClientConstructor
            | undefined;

    if (!serviceConstructor) {
        throw new Error(
            `Service ${serviceName} not found in package ${packageName}`,
        );
    }

    return new serviceConstructor(
        address,
        grpc.credentials.createInsecure(),
    ) as unknown as T;
}

export { grpcClientFactory };
