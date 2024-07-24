import { expect } from "chai";

import SignInUseCase from "@source/domain/use-cases/SignIn.usecase";
import { faker } from "@faker-js/faker";
import { SignInRequest } from "@source/types/generated/protos/authentication/SignInRequest";

describe("Sign In Serializer", () => {
    it("Should serialize sign in data", async () => {
        const signInData: SignInRequest = {
            email: faker.internet.email(),
            password: "Password@123",
            clientId: faker.string.uuid(),
        };

        const signUpSerializer = SignInUseCase.Serializer(signInData);
        signUpSerializer.Serialize();

        expect(signUpSerializer.data!).to.be.deep.equal(signInData);
    });
});
