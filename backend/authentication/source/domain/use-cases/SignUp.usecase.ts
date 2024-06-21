import { ulid } from "ulidx";

import { DatabaseClient } from "@root/source/infrastructure/database/DatabaseManager";
import { SignUpRequest } from "@root/source/types/generated/protos/AuthenticationPackage/SignUpRequest";
import AuthenticationDto, { SignUpSerialized } from "../../application/dtos";
import JsonWebToken from "../../application/utilities/JsonWebToken";
import AccountRepository from "@root/source/infrastructure/database/repositories/Account.repository";
import DeviceRepository from "@root/source/infrastructure/database/repositories/Device.repository";

const Serializer = (data: SignUpRequest) => AuthenticationDto.SignUp(data);

const Authorize = async () => true;

const Handler = async (
	connection: DatabaseClient,
	data: SignUpSerialized,
) => {
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
