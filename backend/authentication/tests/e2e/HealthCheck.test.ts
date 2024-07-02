import { expect } from "chai";
import CreateGrpcClient from "@tests/e2e/utilities/CreateGrpcClient";
import { HealthCheckClient } from "@source/types/generated/protos/health_check/HealthCheck";

describe("Health Check Service test", () => {
	let client: HealthCheckClient;

	before((done) => {
		client = CreateGrpcClient<HealthCheckClient>(
			"source/types/generated/protos/definitions/health_check.proto",
			"health_check",
			"HealthCheck",
		);

		client.waitForReady(Date.now() + 1000, (error) => done(error));
	});

	it("Should be serving", () => {
		client.Check({}, (error, response) => {
			expect(error).to.be.null;
			expect(response).to.have.property("status").equal(1);
		});
	});

	after(() => {
		client.close();
	});
});
