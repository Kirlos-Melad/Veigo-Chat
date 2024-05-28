import { ulid } from "ulidx";

import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import { SignUpRequest } from "@root/source/types/generated/protos/AuthenticationPackage/SignUpRequest";
import { HandlerResult } from "../../application/utilities/TransactionalCall";
import { AuthenticationResponse } from "@root/source/types/generated/protos/AuthenticationPackage/AuthenticationResponse";
import AuthenticationDto from "../../application/dtos";
import JsonWebToken from "../../application/utilities/JsonWebToken";
import AccountRepository from "@root/source/infrastructure/database/repositories/Account.repository";
import DeviceRepository from "@root/source/infrastructure/database/repositories/Device.repository";

async function SignUpUseCase(
	connection: DatabaseClient,
	data: SignUpRequest,
): Promise<HandlerResult<AuthenticationResponse>> {
	try {
		const signUpDto = AuthenticationDto.SignUp(data);
		signUpDto.Serialize();

		const account = await AccountRepository.Create(connection, {
			email: signUpDto.data!.email,
			password: signUpDto.data!.password,
			phone: signUpDto.data!.phone,
		});

		const device = await DeviceRepository.Create(connection, {
			accountId: account.id,
			clientId: signUpDto.data!.clientId,
			accessTokenId: ulid(),
			refreshTokenId: ulid(),
		});

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

export default SignUpUseCase;
