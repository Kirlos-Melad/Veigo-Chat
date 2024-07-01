import { ulid } from "ulidx";

import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { SignUpRequest } from "@source/types/generated/protos/authentication/SignUpRequest";
import AuthenticationDto, { SignUpSerialized } from "@source/application/dtos";
import JsonWebToken from "@source/application/utilities/JsonWebToken";
import AccountRepository from "@source/infrastructure/database/repositories/Account.repository";
import DeviceRepository from "@source/infrastructure/database/repositories/Device.repository";

const Serializer = (data: SignUpRequest) => AuthenticationDto.SignUp(data);

const Authorize = async () => true;

const Handler = async (connection: DatabaseClient, data: SignUpSerialized) => {
	const account = await AccountRepository.Create(connection, {
		email: data.email,
		password: data.password,
		phone: data.phone,
	});

	const device = await DeviceRepository.Create(connection, {
		accountId: account.id,
		clientId: data.clientId,
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
		account: account,
		token: {
			access: accessToken,
			refresh: refreshToken,
		},
	};
};

export default { Serializer, Authorize, Handler };
