import grpc from "@grpc/grpc-js";
import { EmptyObject } from "@source/types/generated/protos/common_objects/EmptyObject";
import { HealthCheckHandlers } from "@source/types/generated/protos/health_check/HealthCheck";
import { HealthCheckResponse } from "@source/types/generated/protos/health_check/HealthCheckResponse";

class HealthCheckService implements HealthCheckHandlers {
	[name: string]: import("@grpc/grpc-js").UntypedHandleCall;

	Check = (
		request: grpc.ServerUnaryCall<EmptyObject, HealthCheckResponse>,
		respond: grpc.sendUnaryData<HealthCheckResponse>,
	) => respond(null, { status: "SERVING" });
}

export default new HealthCheckService();
