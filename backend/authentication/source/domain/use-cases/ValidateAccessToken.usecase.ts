import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import { HandlerResult } from "../../application/utilities/TransactionalCall";
import AuthenticationDto from "../../application/dtos";
import JsonWebToken from "../../application/utilities/JsonWebToken";
import { EmptyObject } from "@root/source/types/generated/protos/AuthenticationPackage/EmptyObject";
import { TokenRequest } from "@root/source/types/generated/protos/AuthenticationPackage/TokenRequest";
import Logger from "@root/source/application/utilities/Logger";
import DeviceRepository from "@root/source/infrastructure/database/repositories/Device.repository";

async function ValidateAccessTokenUseCase(
	connection: DatabaseClient,
	data: TokenRequest,
): Promise<HandlerResult<EmptyObject>> {
	try {
		const validateAccessTokenDto =
			AuthenticationDto.ValidateAccessToken(data);
		validateAccessTokenDto.Serialize();

		// Validate the access token
		const jwt = await JsonWebToken.VerifyAccessToken(
			validateAccessTokenDto.data!.token,
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
		if (device.accessTokenId !== jwt.id || device.forceRefreshToken) {
			Logger.error(`Token must be refreshed`);
			throw new Error("Invalid token");
		}

		// Success
		return { error: null, result: null };
	} catch (error) {
		return { error, result: null };
	}
}

export default ValidateAccessTokenUseCase;
