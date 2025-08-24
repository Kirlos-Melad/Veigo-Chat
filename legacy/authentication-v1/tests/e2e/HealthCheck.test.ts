import { expect } from "chai";

import { grpcClientFactory } from "./factories/grpc.client.factory";
import { HealthCheckClient } from "@source/types/generated/protos/health_check/HealthCheck";
import { _health_check_HealthCheckResponse_ServingStatus } from "@source/types/generated/protos/health_check/HealthCheckResponse";
import { promisifiedGrpcClientCall } from "@tests/utilities/promisified.grpc.client.call";

describe("Check the api health", function () {
    let client: HealthCheckClient;

    before(function () {
        client = grpcClientFactory<HealthCheckClient>(
            "source/types/generated/protos/definitions/health_check.proto",
            "health_check",
            "HealthCheck",
            `localhost:${this.containers.api.getFirstMappedPort()}`,
        );
    });

    it("Should be serving", async function () {
        const result = await promisifiedGrpcClientCall(
            client.Check.bind(client),
            {},
        );

        expect(result).to.not.be.undefined;
        expect(result!.status).to.be.equal(
            _health_check_HealthCheckResponse_ServingStatus.SERVING,
        );
    });
});
