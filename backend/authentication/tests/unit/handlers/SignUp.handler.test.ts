import { step } from "mocha-steps";
import { expect } from "chai";
import { createSandbox } from "sinon";
import { faker } from "@faker-js/faker";

import DatabaseManager, {
	DatabaseClient,
} from "@source/infrastructure/database/DatabaseManager";
import { SignUpSerialized } from "@source/application/dtos";
import JsonWebToken from "@source/application/utilities/JsonWebToken";
import AccountRepository from "@source/infrastructure/database/repositories/Account.repository";
import DeviceRepository from "@source/infrastructure/database/repositories/Device.repository";
import SignUpUseCase from "@source/domain/use-cases/SignUp.usecase";
import AccountEntity from "@source/domain/entities/Account.entity";
import DeviceEntity from "@source/domain/entities/Device.entity";
import PasswordHandler from "@source/application/utilities/PasswordHandler";

describe("Sign Up Handler", () => {
	const sinon = createSandbox();

	let connection: DatabaseClient;
	let accountRepositoryStub: sinon.SinonStubbedInstance<
		typeof AccountRepository
	>;
	let deviceRepositoryStub: sinon.SinonStubbedInstance<
		typeof DeviceRepository
	>;
	let jwtStub: sinon.SinonStubbedInstance<typeof JsonWebToken>;
	const serializedData: SignUpSerialized = {
		email: faker.internet.email(),
		password: PasswordHandler.hash("Password@123"),
		clientId: faker.string.uuid(),
	};

	before(async () => {
		const dbManager = DatabaseManager.CreateInstance({
			connection: process.env.DATABASE_CONNECTION,
		});
		connection = await dbManager.LeaseConnection();
		await connection.StartTransaction("SERIALIZABLE");
		accountRepositoryStub = sinon.stub(AccountRepository);
		deviceRepositoryStub = sinon.stub(DeviceRepository);
		jwtStub = sinon.stub(JsonWebToken);
	});

	after(async () => {
		await connection.RollbackTransaction();
		await connection.Release();
		sinon.restore();
	});

	step("Should Sign up successfully", async () => {
		const account: AccountEntity = {
			id: faker.string.uuid(),
			isEmailVerified: false,
			isPhoneVerified: false,
			createdAt: faker.date.recent().toString(),
			updatedAt: faker.date.recent().toString(),
			...serializedData,
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

		accountRepositoryStub.Create.resolves(account);
		deviceRepositoryStub.Create.resolves(device);
		jwtStub.GenerateAccessToken.resolves(accessToken);
		jwtStub.GenerateRefreshToken.resolves(refreshToken);

		const result = await SignUpUseCase.Handler(
			connection,
			serializedData,
		);

		expect(result.account).to.deep.equal(account);
		expect(result.token.access).to.equal(accessToken);
		expect(result.token.refresh).to.equal(refreshToken);
		expect(accountRepositoryStub.Create.calledOnce).to.be.true;
		expect(deviceRepositoryStub.Create.calledOnce).to.be.true;
		expect(
			jwtStub.GenerateAccessToken.calledOnceWith({
				id: device.accessTokenId,
				subject: {
					accountId: account.id,
					clientId: serializedData.clientId,
				},
			}),
		).to.be.true;
		expect(
			jwtStub.GenerateRefreshToken.calledOnceWith({
				id: device.refreshTokenId,
				subject: {
					accountId: account.id,
					clientId: serializedData.clientId,
				},
			}),
		).to.be.true;
	});
});
