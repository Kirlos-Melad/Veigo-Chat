import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import AuthenticationDto, {
	ValidateAccessTokenSerialized,
} from "../../application/dtos";
import JsonWebToken from "../../application/utilities/JsonWebToken";
import { TokenRequest } from "@source/types/generated/protos/authentication/TokenRequest";
import Logger from "@source/application/utilities/Logger";
import DeviceRepository from "@source/infrastructure/database/repositories/Device.repository";

const Serializer = (data: TokenRequest) =>
	AuthenticationDto.ValidateAccessToken(data);

const Authorize = async () => true;

const Handler = async (
	connection: DatabaseClient,
	data: ValidateAccessTokenSerialized,
) => {
	// Validate the access token
	const jwt = await JsonWebToken.VerifyAccessToken(data.token);

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
	return {};
};

export default { Serializer, Authorize, Handler };
