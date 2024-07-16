import { expect } from "chai";
import { createSandbox } from "sinon";
import { faker } from "@faker-js/faker";

import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { DatabaseHooks } from "@tests/hooks/Database.hooks";
import AccountRepository from "@source/infrastructure/database/repositories/Account.repository";
import DeviceRepository from "@source/infrastructure/database/repositories/Device.repository";
import JsonWebToken from "@source/application/utilities/JsonWebToken";
import { SignUpRequest } from "@source/types/generated/protos/authentication/SignUpRequest";
import SignUpUseCase from "@source/domain/use-cases/SignUp.usecase";
import IAccountRepository from "@source/domain/repositories/IAccount.repository";
import IDeviceRepository from "@source/domain/repositories/IDevice.repository";

describe("Sign Up Functional", () => {
	const sinon = createSandbox();

	let connection: DatabaseClient;
	let accountRepositorySpy: sinon.SinonSpiedInstance<IAccountRepository>;
	let deviceRepositorySpy: sinon.SinonSpiedInstance<IDeviceRepository>;
	let jwtSpy: sinon.SinonSpiedInstance<typeof JsonWebToken>;

	const data: SignUpRequest = {
		email: faker.internet.email(),
		password: "Password@123",
		clientId: faker.string.uuid(),
	};

	before(async () => {
		connection = await DatabaseHooks.BeforeAll();
		accountRepositorySpy = sinon.spy(AccountRepository);
		deviceRepositorySpy = sinon.spy(DeviceRepository);
		jwtSpy = sinon.spy(JsonWebToken);
	});

	after(async () => {
		sinon.restore();
		await DatabaseHooks.AfterAll(connection);
	});

	it("Should handle sign up successfully", async () => {
		const serializer = SignUpUseCase.Serializer(data);
		serializer.Serialize();
		const serializedData = serializer.data!;

		const result = await SignUpUseCase.Handler(connection, serializedData);

		expect(
			accountRepositorySpy.Create.calledOnceWith(connection, {
				email: serializedData.email,
				password: serializedData.password,
				phone: serializedData.phone,
			}),
		).to.be.true;
		expect(
			deviceRepositorySpy.Create.calledOnceWith(connection, {
				accountId: result.account!.id,
				clientId: serializedData.clientId,
				accessTokenId: sinon.match.string,
				refreshTokenId: sinon.match.string,
			}),
		).to.be.true;
		expect(
			jwtSpy.GenerateAccessToken.calledOnceWith({
				id: sinon.match.string,
				subject: {
					accountId: result.account!.id,
					clientId: serializedData.clientId,
				},
			}),
		).to.be.true;
		expect(
			jwtSpy.GenerateRefreshToken.calledOnceWith({
				id: sinon.match.string,
				subject: {
					accountId: result.account!.id,
					clientId: serializedData.clientId,
				},
			}),
		).to.be.true;

		expect(result.account).to.have.property("id");
		expect(result.account)
			.to.have.property("email")
			.equal(serializedData.email);
		expect(result.account).to.have.property("isEmailVerified").equal(false);
		// TODO: must stop returning the password !
		// expect(result.account).to.not.have.property("password");
		expect(result.account)
			.to.have.property("phone")
			.to.be.oneOf([undefined, null]);
		expect(result.account).to.have.property("isPhoneVerified").equal(false);
		expect(result.account).to.have.property("createdAt");
		expect(result.account).to.have.property("updatedAt");
	});
});
