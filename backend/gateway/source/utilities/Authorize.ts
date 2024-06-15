import { ServiceError } from "@grpc/grpc-js";

import GRPCServiceManagerRegistry from "../grpc/GRPCServiceManagerRegistry";

async function Authorize(token?: string | null): Promise<string> {
	if (!token) {
		throw new Error("No authorization token provided");
	}

	const arr = token.split(" ");
	if (arr.length !== 2 || arr[0] !== "SuperDuperUser") {
		throw new Error("Invalid authorization format");
	}

	await new Promise((resolve, reject) =>
		GRPCServiceManagerRegistry.instance
			.Get("Auth")
			.Get("Authentication")
			.ValidateAccessToken(
				{ token: arr[1] },
				(error: ServiceError | null) =>
					error ? reject(error) : resolve({ success: true }),
			),
	);

	return arr[1];
}

export default Authorize;
