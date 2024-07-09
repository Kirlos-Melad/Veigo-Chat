import { expect } from "chai";
import { faker } from "@faker-js/faker";
import { step } from "mocha-steps";

import DatabaseManager, {
	DatabaseClient,
} from "@source/infrastructure/database/DatabaseManager";
import { AccountCreate } from "@source/domain/repositories/IAccount.repository";
import AccountRepository from "@source/infrastructure/database/repositories/Account.repository";

describe("Account Repository", () => {
	let connection: DatabaseClient;
	const accountData: AccountCreate = {
		email: faker.internet.email(),
		password: "Password@123",
	};

	before(async () => {
		const dbManager = DatabaseManager.CreateInstance({
			connection: process.env.DATABASE_CONNECTION,
		});
		connection = await dbManager.LeaseConnection();
		await connection.StartTransaction("SERIALIZABLE");
	});

	after(async () => {
		await connection.RollbackTransaction();
		await connection.Release();
	});

	step(
		"Should create a new account and return the account entity",
		async () => {
			const result = await AccountRepository.Create(
				connection,
				accountData,
			);

			expect(result.email).to.be.equal(accountData.email);
			expect(result.password).to.be.equal(accountData.password);
		},
	);

	step(
		"Should find an account by email and return the account entity",
		async () => {
			const result = await AccountRepository.FindByEmail(
				connection,
				accountData.email,
			);

			expect(result).to.be.not.null;
			expect(result!.email).to.be.equal(accountData.email);
		},
	);
});
