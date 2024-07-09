import { expect } from "chai";
import { createSandbox } from "sinon";
import { faker } from "@faker-js/faker";

import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { SignInSerialized } from "@source/application/dtos";
import JsonWebToken from "@source/application/utilities/JsonWebToken";
import AccountRepository from "@source/infrastructure/database/repositories/Account.repository";
import DeviceRepository from "@source/infrastructure/database/repositories/Device.repository";
import SignInUseCase from "@source/domain/use-cases/SignIn.usecase";
import AccountEntity from "@source/domain/entities/Account.entity";
import DeviceEntity from "@source/domain/entities/Device.entity";
import PasswordHandler from "@source/application/utilities/PasswordHandler";

describe("Sign In Handler", () => {
	const sinon = createSandbox();

	const connection: DatabaseClient = {} as DatabaseClient;
	let accountRepositoryStub: sinon.SinonStubbedInstance<
		typeof AccountRepository
	>;
	let deviceRepositoryStub: sinon.SinonStubbedInstance<
		typeof DeviceRepository
	>;
	let jwtStub: sinon.SinonStubbedInstance<typeof JsonWebToken>;

	const serializedData: SignInSerialized = {
		email: faker.internet.email(),
		password: "Password@123",
		clientId: faker.string.uuid(),
	};

	before(() => {
		accountRepositoryStub = sinon.stub(AccountRepository);
		deviceRepositoryStub = sinon.stub(DeviceRepository);
		jwtStub = sinon.stub(JsonWebToken);
	});

	after(() => {
		sinon.restore();
	});

	it("Should handle sign in successfully", async () => {
		const account: AccountEntity = {
			id: faker.string.uuid(),
			email: serializedData.email,
			password: PasswordHandler.hash(serializedData.password),
			isEmailVerified: true,
			isPhoneVerified: true,
			createdAt: faker.date.recent().toString(),
			updatedAt: faker.date.recent().toString(),
		};

		const device: DeviceEntity = {
			accountId: account.id,
			clientId: serializedData.clientId,
			accessTokenId: faker.string.uuid(),
			refreshTokenId: faker.string.uuid(),
			forceRefreshToken: false,
			forceSignIn: false,
			createdAt: faker.date.recent().toString(),
			updatedAt: faker.date.recent().toString(),
		};

		const accessToken = "access-token";
		const refreshToken = "refresh-token";

		accountRepositoryStub.FindByEmail.resolves(account);
		deviceRepositoryStub.Upsert.resolves(device);
		jwtStub.GenerateAccessToken.resolves(accessToken);
		jwtStub.GenerateRefreshToken.resolves(refreshToken);

		const result = await SignInUseCase.Handler(connection, serializedData);

		expect(
			accountRepositoryStub.FindByEmail.calledOnceWith(
				connection,
				serializedData.email,
			),
		).to.be.true;
		expect(
			deviceRepositoryStub.Upsert.calledOnceWith(
				connection,
				{
					accountId: account.id,
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
			jwtStub.GenerateAccessToken.calledOnceWith({
				id: device.accessTokenId,
				subject: {
					accountId: account.id,
					clientId: device.clientId,
				},
			}),
		).to.be.true;
		expect(
			jwtStub.GenerateRefreshToken.calledOnceWith({
				id: device.refreshTokenId,
				subject: {
					accountId: account.id,
					clientId: device.clientId,
				},
			}),
		).to.be.true;

		expect(result.account).to.deep.equal(account);
		expect(result.token.access).to.equal(accessToken);
		expect(result.token.refresh).to.equal(refreshToken);
	});
});
