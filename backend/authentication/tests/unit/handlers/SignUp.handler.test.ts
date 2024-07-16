import { step } from "mocha-steps";
import { expect } from "chai";
import { createSandbox } from "sinon";
import { faker } from "@faker-js/faker";

import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { SignUpSerialized } from "@source/application/dtos";
import JsonWebToken from "@source/application/utilities/JsonWebToken";
import AccountRepository from "@source/infrastructure/database/repositories/Account.repository";
import DeviceRepository from "@source/infrastructure/database/repositories/Device.repository";
import SignUpUseCase from "@source/domain/use-cases/SignUp.usecase";
import AccountEntity from "@source/domain/entities/Account.entity";
import DeviceEntity from "@source/domain/entities/Device.entity";
import PasswordHandler from "@source/application/utilities/PasswordHandler";
import { AccountFactory } from "@tests/factories/Account.factory";
import { DeviceFactory } from "@tests/factories/Device.factory";
import IAccountRepository from "@source/domain/repositories/IAccount.repository";
import IDeviceRepository from "@source/domain/repositories/IDevice.repository";

describe("Sign Up Handler", () => {
	const sinon = createSandbox();

	const connection: DatabaseClient = {} as DatabaseClient;
	let accountRepositoryStub: sinon.SinonStubbedInstance<IAccountRepository>;
	let deviceRepositoryStub: sinon.SinonStubbedInstance<IDeviceRepository>;
	let jwtStub: sinon.SinonStubbedInstance<typeof JsonWebToken>;
	const serializedData: SignUpSerialized = {
		email: faker.internet.email(),
		password: PasswordHandler.hash("Password@123"),
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

	step("Should handle Sign up successfully", async () => {
		const account: AccountEntity = AccountFactory(serializedData);
		const device: DeviceEntity = DeviceFactory({
			accountId: account.id,
			clientId: serializedData.clientId,
		});
		const accessToken = "access-token";
		const refreshToken = "refresh-token";

		accountRepositoryStub.Create.resolves(account);
		deviceRepositoryStub.Create.resolves(device);
		jwtStub.GenerateAccessToken.resolves(accessToken);
		jwtStub.GenerateRefreshToken.resolves(refreshToken);

		const result = await SignUpUseCase.Handler(connection, serializedData);

		expect(
			accountRepositoryStub.Create.calledOnceWith(connection, {
				email: serializedData.email,
				password: serializedData.password,
				phone: serializedData.phone,
			}),
		).to.be.true;
		expect(
			deviceRepositoryStub.Create.calledOnceWith(connection, {
				accountId: account.id,
				clientId: serializedData.clientId,
				accessTokenId: sinon.match.string,
				refreshTokenId: sinon.match.string,
			}),
		).to.be.true;
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

		expect(result.account).to.deep.equal(account);
		expect(result.token!.access).to.equal(accessToken);
		expect(result.token!.refresh).to.equal(refreshToken);
	});
});
