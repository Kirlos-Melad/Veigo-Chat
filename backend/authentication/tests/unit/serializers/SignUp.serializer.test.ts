import { expect } from "chai";
import { faker } from "@faker-js/faker";
import bcrpt from "bcrypt";

import SignUpUseCase from "@source/domain/use-cases/SignUp.usecase";
import { SignUpRequest } from "@source/types/generated/protos/authentication/SignUpRequest";

describe("Sign Up Serializer", () => {
	it("Should serialize sign up data", async () => {
		const signUpData: SignUpRequest = {
			email: faker.internet.email(),
			password: "Password@123",
			clientId: faker.string.uuid(),
		};

		const serializer = SignUpUseCase.Serializer(signUpData);
		serializer.Serialize();

		expect(serializer.data!.email).to.equal(signUpData.email);
		expect(serializer.data!.clientId).to.equal(signUpData.clientId);
		expect(
			bcrpt.compareSync(signUpData.password!, serializer.data!.password),
		).to.not.throw;
	});
});
