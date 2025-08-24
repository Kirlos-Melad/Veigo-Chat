import { describe } from "mocha";
import { expect } from "chai";
import { faker } from "@faker-js/faker";
import { step } from "mocha-steps";

import GQLHandler from "@tests/utilities/GQLHandler";
import Password from "@tests/utilities/Password";
import context from "@tests/utilities/context";

describe("Test Login", () => {
	before(() => {
		context.User = {
			clientId: faker.string.uuid(),
			account: {
				email: faker.internet.email(),
				password: faker.internet.password({
					pattern: Password.pattern,
				}),
			},
		};
	});

	afterEach("Check if access token is valid", async () => {
		const operationName = "ValidateAccessToken";

		const validateAccessTokenQuery = GQLHandler.QueryBuilder.mutation({
			operation: operationName,
			variables: {
				token: { value: context.User.token!.access, required: true },
			},
			fields: ["success"],
		});

		const response = await GQLHandler.Request({
			data: validateAccessTokenQuery,
		});
		const validateAccessTokenResponse = GQLHandler.AssertResponse({
			operationName,
			response,
		});

		expect(validateAccessTokenResponse)
			.to.have.property("success")
			.equal(true);
	});

	it("Should sign up successfully", async () => {
		const operationName = "SignUp";

		const signUpQuery = GQLHandler.QueryBuilder.mutation({
			operation: operationName,
			variables: {
				email: { value: context.User.account!.email, required: true },
				password: {
					value: context.User.account!.password,
					required: true,
				},
				clientId: {
					value: context.User.clientId,
					required: true,
				},
			},
			fields: [
				{ account: ["id", "email"] },
				{ token: ["access", "refresh"] },
			],
		});

		const response = await GQLHandler.Request({ data: signUpQuery });
		const signUpResponse = GQLHandler.AssertResponse({
			operationName,
			response,
		});

		// Assert Account Properties
		expect(signUpResponse).to.have.property("account");
		expect(signUpResponse.account).to.have.property("id");
		expect(signUpResponse.account)
			.to.have.property("email")
			.equal(context.User.account!.email);

		// Assert Token Properties
		expect(signUpResponse).to.have.property("token");
		expect(signUpResponse.token).to.have.property("access");
		expect(signUpResponse.token).to.have.property("refresh");

		// Set Current User
		context.User.id = signUpResponse.account.id;
		context.User.token = signUpResponse.token;
	});

	it("Should sign in successfully", async () => {
		const operationName = "SignIn";

		const signInQuery = GQLHandler.QueryBuilder.mutation({
			operation: operationName,
			variables: {
				email: { value: context.User.account!.email, required: true },
				password: {
					value: context.User.account!.password,
					required: true,
				},
				clientId: {
					value: context.User.clientId,
					required: true,
				},
			},
			fields: [
				{ account: ["id", "email"] },
				{ token: ["access", "refresh"] },
			],
		});

		const response = await GQLHandler.Request({ data: signInQuery });
		const signInResponse = GQLHandler.AssertResponse({
			operationName,
			response,
		});

		// Assert Account Properties
		expect(signInResponse).to.have.property("account");
		expect(signInResponse.account)
			.to.have.property("id")
			.equal(context.User.id);
		expect(signInResponse.account)
			.to.have.property("email")
			.equal(context.User.account!.email);

		// Assert Token Properties
		expect(signInResponse).to.have.property("token");
		expect(signInResponse.token).to.have.property("access");
		expect(signInResponse.token).to.have.property("refresh");

		// Update Token
		context.User.token = signInResponse.token;
	});

	it("Should refresh token successfully", async () => {
		const operationName = "RefreshToken";

		const refreshTokenQuery = GQLHandler.QueryBuilder.mutation({
			operation: operationName,
			variables: {
				token: { value: context.User.token?.refresh, required: true },
			},
			fields: ["access", "refresh"],
		});

		const response = await GQLHandler.Request({ data: refreshTokenQuery });
		const refreshTokenResponse = GQLHandler.AssertResponse({
			operationName,
			response,
		});

		// Assert Token Properties
		expect(refreshTokenResponse).to.have.property("access");
		expect(refreshTokenResponse).to.have.property("refresh");

		// Update Token
		context.User.token = refreshTokenResponse;
	});
});
