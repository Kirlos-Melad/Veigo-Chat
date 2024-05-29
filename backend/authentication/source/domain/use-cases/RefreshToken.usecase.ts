import { ulid } from "ulidx";

import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import { HandlerResult } from "../../application/utilities/TransactionalCall";
import AuthenticationDto from "../../application/dtos";
import JsonWebToken from "../../application/utilities/JsonWebToken";
import { TokenRequest } from "@root/source/types/generated/protos/AuthenticationPackage/TokenRequest";
import Logger from "@root/source/application/utilities/Logger";
import DeviceRepository from "@root/source/infrastructure/database/repositories/Device.repository";
import { TokenObject } from "@root/source/types/generated/protos/AuthenticationPackage/TokenObject";

async function RefreshTokenUseCase(
	connection: DatabaseClient,
	data: TokenRequest,
): Promise<HandlerResult<TokenObject>> {
	try {
		const refreshTokenDto = AuthenticationDto.RefreshToken(data);
		refreshTokenDto.Serialize();

		// Validate the access token
		const jwt = await JsonWebToken.VerifyRefreshToken(
			refreshTokenDto.data!.token,
		);

		// Check if the claims are present
		if (!jwt.id || !jwt.subject) {
			Logger.error(`Claims missing in token`);
			throw new Error("Invalid token");
		}

		// Check if the device exists
		const device = await DeviceRepository.Read(connection, {
			accountId: jwt.subject.accountId,
			clientId: jwt.subject.clientId,
		});
		if (!device) {
			Logger.error(`Device not found`);
			throw new Error("Invalid token");
		}

		// Check if the token is still valid
		if (device.refreshTokenId !== jwt.id || device.forceSignIn) {
			Logger.error(`User must sign in again`);
			await DeviceRepository.Update(
				connection,
				{
					accountId: jwt.subject.accountId,
					clientId: jwt.subject.clientId,
				},
				{ forceSignIn: true },
			);
			throw new Error("Invalid token");
		}

		const nDevice = await DeviceRepository.Update(
			connection,
			{
				accountId: jwt.subject.accountId,
				clientId: jwt.subject.clientId,
			},
			{
				accessTokenId: ulid(),
				refreshTokenId: ulid(),
				forceSignIn: false,
				forceRefreshToken: false,
			},
		);

		const [accessToken, refreshToken] = await Promise.all([
			JsonWebToken.GenerateAccessToken({
				id: nDevice.accessTokenId,
				subject: {
					accountId: nDevice.accountId,
					clientId: nDevice.clientId,
				},
			}),
			JsonWebToken.GenerateRefreshToken({
				id: nDevice.refreshTokenId,
				subject: {
					accountId: nDevice.accountId,
					clientId: nDevice.clientId,
				},
			}),
		]);

		return {
			error: null,
			result: { access: accessToken, refresh: refreshToken },
		};
	} catch (error) {
		return { error, result: null };
	}
}

export default RefreshTokenUseCase;
