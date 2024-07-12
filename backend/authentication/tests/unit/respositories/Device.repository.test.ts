import { expect } from "chai";
import { faker } from "@faker-js/faker";
import { step } from "mocha-steps";

import { DatabaseHooks } from "@tests/hooks/Database.hooks";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import DeviceRepository from "@source/infrastructure/database/repositories/Device.repository";
import {
	DeviceCreate,
	DeviceRead,
	DeviceUpdate,
} from "@source/domain/repositories/IDevice.repository";

describe("Device Repository", () => {
	let connection: DatabaseClient;

	const account = {
		id: faker.string.uuid(),
		email: faker.internet.email(),
		password: "Password@123",
	};

	let deviceData: DeviceCreate = {
		accountId: account.id,
		clientId: faker.string.uuid(),
		accessTokenId: faker.string.alphanumeric({ length: 32 }),
		refreshTokenId: faker.string.alphanumeric({ length: 32 }),
	};

	const deviceUpdate: DeviceUpdate = {
		accessTokenId: faker.string.alphanumeric({ length: 32 }),
		refreshTokenId: faker.string.alphanumeric({ length: 32 }),
	};

	before(async () => {
		connection = await DatabaseHooks.BeforeAll();

		await connection.Execute(
			`INSERT INTO accounts (id, email, password) VALUES ('${account.id}', '${account.email}', '${account.password}');`,
		);
	});

	after(async () => {
		await DatabaseHooks.AfterAll(connection);
	});

	describe("Create device", () => {
		step(
			"Should create a new device and return the device entity",
			async () => {
				const result = await DeviceRepository.Create(
					connection,
					deviceData,
				);

				expect(result.accountId).to.be.equal(deviceData.accountId);
				expect(result.clientId).to.be.equal(deviceData.clientId);
				expect(result.accessTokenId).to.be.equal(
					deviceData.accessTokenId,
				);
				expect(result.refreshTokenId).to.be.equal(
					deviceData.refreshTokenId,
				);
			},
		);
	});

	describe("Read device", () => {
		step(
			"Should find a device by accountId and clientId and return the device entity",
			async () => {
				const result = await DeviceRepository.Read(connection, {
					accountId: deviceData.accountId,
					clientId: deviceData.clientId,
				});

				expect(result).to.be.not.undefined;
				expect(result!.accountId).to.be.equal(deviceData.accountId);
				expect(result!.clientId).to.be.equal(deviceData.clientId);
			},
		);

		step(
			"Should return undefined if no device is found with the provided accountId and clientId",
			async () => {
				const nonExistentRead: DeviceRead = {
					accountId: faker.string.uuid(),
					clientId: faker.string.uuid(),
				};

				const result = await DeviceRepository.Read(
					connection,
					nonExistentRead,
				);

				expect(result).to.be.undefined;
			},
		);
	});

	describe("Update device", () => {
		step(
			"Should update a device and return the updated device entity",
			async () => {
				const result = await DeviceRepository.Update(
					connection,
					{
						accountId: deviceData.accountId,
						clientId: deviceData.clientId,
					},
					deviceUpdate,
				);

				expect(result.accessTokenId).to.be.equal(
					deviceUpdate.accessTokenId,
				);
				expect(result.refreshTokenId).to.be.equal(
					deviceUpdate.refreshTokenId,
				);

				deviceData.accessTokenId = result.accessTokenId;
				deviceData.refreshTokenId = result.refreshTokenId;
			},
		);

		step(
			"Should return the existing device if no updates are provided",
			async () => {
				const existingDevice = await DeviceRepository.Read(connection, {
					accountId: deviceData.accountId,
					clientId: deviceData.clientId,
				});

				const result = await DeviceRepository.Update(
					connection,
					{
						accountId: deviceData.accountId,
						clientId: deviceData.clientId,
					},
					{},
				);

				expect(result).to.deep.equal(existingDevice);
			},
		);
	});

	describe("Upsert device", () => {
		step(
			"Should upsert a device and return the device entity",
			async () => {
				const result = await DeviceRepository.Upsert(
					connection,
					{
						accountId: deviceData.accountId,
						clientId: deviceData.clientId,
					},
					deviceUpdate,
				);

				expect(result.accountId).to.be.equal(deviceData.accountId);
				expect(result.clientId).to.be.equal(deviceData.clientId);
			},
		);
	});
});
