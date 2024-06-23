import grpc from "@grpc/grpc-js";
import { EmptyObject } from "@root/source/types/generated/protos/CommonObjects/EmptyObject";
import { HealthCheckHandlers } from "@root/source/types/generated/protos/HealthCheck/HealthCheck";
import { HealthCheckResponse } from "@root/source/types/generated/protos/HealthCheck/HealthCheckResponse";

class HealthCheckService implements HealthCheckHandlers {
	[name: string]: import("@grpc/grpc-js").UntypedHandleCall;

	Check = (
		request: grpc.ServerUnaryCall<EmptyObject, HealthCheckResponse>,
		respond: grpc.sendUnaryData<HealthCheckResponse>,
	) => respond(null, { status: "SERVING" });
}

export default new HealthCheckService();
