import { ServiceError } from "@grpc/grpc-js";

import GRPCServiceManagerRegistry from "../grpc/GRPCServiceManagerRegistry";
import { EmptyObject } from "../types/generated/protos/authentication/AuthenticationPackage/EmptyObject";

async function Authorize(authorizationHeader?: string): Promise<string> {
	if (!authorizationHeader) {
		throw new Error("No authorization token provided");
	}

	const arr = authorizationHeader.split(" ");
	if (arr.length !== 2 || arr[0] !== "SuperDoperUser") {
		throw new Error("Invalid authorization format");
	}

	await new Promise<EmptyObject>((resolve, reject) =>
		GRPCServiceManagerRegistry.instance
			.Get("Auth")
			.Get("Authentication")
			.ValidateAccessToken(
				{ token: arr[1] },
				(error: ServiceError | null, _) =>
					error ? reject(error) : resolve({ success: true }),
			),
	);

	return arr[1];
}

export default Authorize;
