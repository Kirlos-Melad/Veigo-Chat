import { ulid } from "ulidx";

import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import AuthenticationDto from "@source/application/dtos";
import JsonWebToken from "@source/application/utilities/JsonWebToken";
import { TokenRequest } from "@source/types/generated/protos/authentication/TokenRequest";
import Logger from "@source/application/utilities/Logger";
import DeviceRepository from "@source/infrastructure/database/repositories/Device.repository";
import { RefreshTokenSerialized } from "@source/application/dtos/RefreshToken.dto";
import { TokenObject } from "@source/types/generated/protos/authentication_objects/TokenObject";

const Serializer = (data: TokenRequest) => AuthenticationDto.RefreshToken(data);

const Authorize = async () => true;

const Handle = async (
	connection: DatabaseClient,
	data: RefreshTokenSerialized,
): Promise<TokenObject> => {
	// Validate the access token
	const jwt = await JsonWebToken.VerifyRefreshToken(data.token);

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

	return { access: accessToken, refresh: refreshToken };
};

export default { Serializer, Authorize, Handle };
