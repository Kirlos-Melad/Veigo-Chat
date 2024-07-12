import { expect } from "chai";
import { createSandbox } from "sinon";
import { faker } from "@faker-js/faker";

import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import SignInUseCase from "@source/domain/use-cases/SignIn.usecase";
import { DatabaseHooks } from "@tests/hooks/Database.hooks";
import { SignInRequest } from "@source/types/generated/protos/authentication/SignInRequest";
import AccountRepository from "@source/infrastructure/database/repositories/Account.repository";
import DeviceRepository from "@source/infrastructure/database/repositories/Device.repository";
import JsonWebToken from "@source/application/utilities/JsonWebToken";
import PasswordHandler from "@source/application/utilities/PasswordHandler";

describe("Sign In Functional", () => {
	const sinon = createSandbox();

	let connection: DatabaseClient;
	let accountRepositorySpy: sinon.SinonSpiedInstance<
		typeof AccountRepository
	>;
	let deviceRepositorySpy: sinon.SinonSpiedInstance<typeof DeviceRepository>;
	let jwtSpy: sinon.SinonSpiedInstance<typeof JsonWebToken>;

	const data: SignInRequest = {
		email: faker.internet.email(),
		password: "Password@123",
		clientId: faker.string.uuid(),
	};

	before(async () => {
		connection = await DatabaseHooks.BeforeAll();

		AccountRepository.Create(connection, {
			email: data.email!,
			password: PasswordHandler.hash(data.password!),
		});

		accountRepositorySpy = sinon.spy(AccountRepository);
		deviceRepositorySpy = sinon.spy(DeviceRepository);
		jwtSpy = sinon.spy(JsonWebToken);
	});

	after(async () => {
		sinon.restore();
		await DatabaseHooks.AfterAll(connection);
	});

	it("Should handle sign in successfully", async () => {
		const serializer = SignInUseCase.Serializer(data);
		serializer.Serialize();
		const serializedData = serializer.data!;

		const result = await SignInUseCase.Handler(connection, serializedData);

		expect(
			accountRepositorySpy.FindByEmail.calledOnceWith(
				connection,
				serializedData.email,
			),
		).to.be.true;
		expect(
			deviceRepositorySpy.Upsert.calledOnceWith(
				connection,
				{
					accountId: result.account.id,
					clientId: serializedData.clientId,
				},
				{
					accessTokenId: sinon.match.string,
					refreshTokenId: sinon.match.string,
					forceRefreshToken: false,
					forceSignIn: false,
				},
			),
		).to.be.true;
		expect(
			jwtSpy.GenerateAccessToken.calledOnceWith({
				id: sinon.match.string,
				subject: {
					accountId: result.account.id,
					clientId: serializedData.clientId,
				},
			}),
		).to.be.true;
		expect(
			jwtSpy.GenerateRefreshToken.calledOnceWith({
				id: sinon.match.string,
				subject: {
					accountId: result.account.id,
					clientId: serializedData.clientId,
				},
			}),
		).to.be.true;

		expect(result.account).to.have.property("id");
		expect(result.account)
			.to.have.property("email")
			.equal(serializedData.email);
		expect(result.account).to.have.property("isEmailVerified").equal(false);
		expect(result.account)
			.to.have.property("phone")
			.to.be.oneOf([null, undefined]);
		expect(result.account).to.have.property("isPhoneVerified").equal(false);
		expect(result.account).to.have.property("createdAt");
		expect(result.account).to.have.property("updatedAt");
	});
});
