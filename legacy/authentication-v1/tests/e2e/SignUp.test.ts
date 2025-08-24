import { expect } from "chai";
import { faker } from "@faker-js/faker";

import { grpcClientFactory } from "./factories/grpc.client.factory";
import { AuthenticationClient } from "@source/types/generated/protos/authentication/Authentication";
import { promisifiedGrpcClientCall } from "@tests/utilities/promisified.grpc.client.call";

function accountAssertions(
    account: unknown,
    expected: { email: string; phone?: string },
): void {
    expect(account).to.have.property("id").that.is.a("string");
    expect(account)
        .to.have.property("email")
        .that.is.a("string")
        .and.to.be.equal(expected.email);
    expect(account)
        .to.have.property("isEmailVerified")
        .that.is.a("boolean")
        .and.to.be.equal(false);
    expect(account)
        .to.have.property("phone")
        .that.is.a("string")
        .and.to.be.equal(expected.phone);
    expect(account)
        .to.have.property("isPhoneVerified")
        .that.is.a("boolean")
        .and.to.be.equal(false);
    expect(account).to.have.property("createdAt").that.is.a("string");
    expect(account).to.have.property("updatedAt").that.is.a("string");
    // Check that no extra keys exist
    expect(Object.keys(account as object)).to.have.members([
        "id",
        "email",
        "isEmailVerified",
        "phone",
        "isPhoneVerified",
        "createdAt",
        "updatedAt",
    ]);
}

function tokenAssertions(token: unknown): void {
    expect(token).to.have.property("access").that.is.a("string");
    expect(token).to.have.property("refresh").that.is.a("string");
    // Check that no extra keys exist
    expect(Object.keys(token as object)).to.have.members(["access", "refresh"]);
}

describe("Check the api sign up", function () {
    let client: AuthenticationClient;

    before(function () {
        client = grpcClientFactory<AuthenticationClient>(
            "source/types/generated/protos/definitions/authentication.proto",
            "authentication",
            "Authentication",
            `localhost:${this.containers.api.getFirstMappedPort()}`,
        );
    });

    it("Should successfully sign up a new user", async function () {
        const validData = {
            clientId: faker.string.uuid(),
            email: faker.internet.email(),
            password: "Password@123",
            phone: faker.phone.number(),
        };

        const result = await promisifiedGrpcClientCall(
            client.SignUp.bind(client),
            validData,
        );

        expect(result).to.not.be.undefined;

        // Account properties assertion
        expect(result).to.have.property("account").that.is.an("object");
        accountAssertions(result!.account!, {
            email: validData.email,
            phone: validData.phone,
        });

        // Token properties assertion
        expect(result).to.have.property("token").that.is.an("object");
        tokenAssertions(result!.token!);
    });

    it("Should successfully sign up a new user and return a normalized email", async function () {
        const validData = {
            clientId: faker.string.uuid(),
            email: "CAP@EMAIL.COM",
            password: "Password@123",
            phone: faker.phone.number(),
        };

        const result = await promisifiedGrpcClientCall(
            client.SignUp.bind(client),
            validData,
        );

        expect(result).to.not.be.undefined;

        // Account properties assertion
        expect(result).to.have.property("account").that.is.an("object");
        accountAssertions(result!.account!, {
            email: "cap@email.com",
            phone: validData.phone,
        });

        // Token properties assertion
        expect(result).to.have.property("token").that.is.an("object");
        tokenAssertions(result!.token!);
    });
});
