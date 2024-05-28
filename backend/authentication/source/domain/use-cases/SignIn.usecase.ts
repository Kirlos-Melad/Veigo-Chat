import { ulid } from "ulidx";
import bcrypt from "bcrypt";

import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import { HandlerResult } from "../../application/utilities/TransactionalCall";
import { AuthenticationResponse } from "@root/source/types/generated/protos/AuthenticationPackage/AuthenticationResponse";
import AuthenticationDto from "../../application/dtos";
import JsonWebToken from "../../application/utilities/JsonWebToken";
import AccountRepository from "@root/source/infrastructure/database/repositories/Account.repository";
import DeviceRepository from "@root/source/infrastructure/database/repositories/Device.repository";
import { SignInRequest } from "@root/source/types/generated/protos/AuthenticationPackage/SignInRequest";

async function SignInUseCase(
	connection: DatabaseClient,
	data: SignInRequest,
): Promise<HandlerResult<AuthenticationResponse>> {
	try {
		const signInDto = AuthenticationDto.SignIn(data);
		signInDto.Serialize();

		const account = await AccountRepository.FindByEmail(
			connection,
			signInDto.data!.email,
		);

		if (
			!account ||
			!bcrypt.compareSync(signInDto.data!.password, account.password)
		) {
			throw new Error("Invalid email or password");
		}

		const device = await DeviceRepository.Upsert(
			connection,
			{
				accountId: account.id,
				clientId: signInDto.data!.clientId,
			},
			{
				accessTokenId: ulid(),
				refreshTokenId: ulid(),
				forceRefreshToken: false,
				forceSignIn: false,
			},
		);

		const [accessToken, refreshToken] = await Promise.all([
			JsonWebToken.GenerateAccessToken({
				id: device.accessTokenId,
				subject: {
					accountId: device.accountId,
					clientId: device.clientId,
				},
			}),
			JsonWebToken.GenerateRefreshToken({
				id: device.refreshTokenId,
				subject: {
					accountId: device.accountId,
					clientId: device.clientId,
				},
			}),
		]);

		return {
			error: null,
			result: {
				account: account,
				token: {
					access: accessToken,
					refresh: refreshToken,
				},
			},
		};
	} catch (error) {
		return { error, result: null };
	}
}

export default SignInUseCase;
