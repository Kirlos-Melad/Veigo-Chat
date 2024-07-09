import { expect } from "chai";
import { faker } from "@faker-js/faker";

import CreateGrpcClient from "@tests/e2e/utilities/CreateGrpcClient";
import { AuthenticationClient } from "@source/types/generated/protos/authentication/Authentication";

describe("Authentication Service Test", () => {
	let client: AuthenticationClient;
	const user: {
		id?: string;
		clientId?: string;

		account: {
			email: string;
			isEmailVerified?: boolean;

			password: string;

			phone?: string;
			isPhoneVerified?: boolean;
		};

		token?: {
			access: string;
			refresh: string;
		};
	} = {
		clientId: faker.string.uuid(),
		account: {
			email: faker.internet.email(),
			password: "Password@123",
		},
	};

	before((done) => {
		client = CreateGrpcClient<AuthenticationClient>(
			"source/types/generated/protos/definitions/authentication.proto",
			"authentication",
			"Authentication",
		);

		client.waitForReady(Date.now() + 1000, (error) => done(error));
	});

	after(() => {
		client.close();
	});

	afterEach("Check if access token is valid", (done) => {
		client.ValidateAccessToken(
			{
				token: user.token!.access,
			},
			(error, response) => {
				expect(error).to.be.null;
				expect(response).not.to.be.undefined;
				expect(response).to.be.deep.equal({});
				done();
			},
		);
	});

	it("Should sign up successfully", (done) => {
		client.SignUp(
			{
				clientId: user.clientId,
				email: user.account.email,
				password: user.account.password,
			},
			(error, response) => {
				expect(error).to.be.null;
				expect(response).not.to.be.undefined;

				// Assert Account Properties
				expect(response).to.have.property("account");
				expect(response!.account).to.have.property("id");
				expect(response!.account)
					.to.have.property("email")
					.equal(user.account.email);

				// Assert Token Properties
				expect(response).to.have.property("token");
				expect(response!.token).to.have.property("access");
				expect(response!.token).to.have.property("refresh");

				// Set Current User
				user.id = response!.account!.id;
				user.token = {
					access: response!.token!.access!,
					refresh: response!.token!.refresh!,
				};

				done();
			},
		);
	});

	it("Should sign in successfully", (done) => {
		client.signIn(
			{
				clientId: user.clientId,
				email: user.account.email,
				password: user.account.password,
			},
			(error, response) => {
				expect(error).to.be.null;
				expect(response).not.to.be.undefined;

				// Assert Account Properties
				expect(response).to.have.property("account");
				expect(response!.account).to.have.property("id").equal(user.id);
				expect(response!.account)
					.to.have.property("email")
					.equal(user.account!.email);
				// Assert Token Properties
				expect(response).to.have.property("token");
				expect(response!.token).to.have.property("access");
				expect(response!.token).to.have.property("refresh");
				// Update Token
				user.token = {
					access: response!.token!.access!,
					refresh: response!.token!.refresh!,
				};

				done();
			},
		);
	});

	it("Should refresh token successfully", (done) => {
		client.RefreshToken(
			{ token: user.token!.refresh },
			(error, response) => {
				expect(error).to.be.null;
				expect(response).not.to.be.undefined;

				// Assert Token Properties
				expect(response).to.have.property("access");
				expect(response).to.have.property("refresh");
				// Update Token
				user.token = {
					access: response!.access!,
					refresh: response!.refresh!,
				};

				done();
			},
		);
	});
});
