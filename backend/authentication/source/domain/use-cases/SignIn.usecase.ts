import { ulid } from "ulidx";
import bcrypt from "bcrypt";

import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import AuthenticationDto, { SignInSerialized } from "@source/application/dtos";
import JsonWebToken from "@source/application/utilities/JsonWebToken";
import AccountRepository from "@source/infrastructure/database/repositories/Account.repository";
import DeviceRepository from "@source/infrastructure/database/repositories/Device.repository";
import { SignInRequest } from "@source/types/generated/protos/authentication/SignInRequest";
import { AuthenticationResponse } from "@source/types/generated/protos/authentication/AuthenticationResponse";

const Serializer = (data: SignInRequest) => AuthenticationDto.SignIn(data);

const Authorize = async () => true;

const Handler = async (
	connection: DatabaseClient,
	data: SignInSerialized,
): Promise<AuthenticationResponse> => {
	const account = await AccountRepository.FindByEmail(connection, {
		email: data.email,
	});

	if (!account || !bcrypt.compareSync(data.password, account.password!)) {
		throw new Error("Invalid email or password");
	}

	const device = await DeviceRepository.Upsert(
		connection,
		{
			accountId: account.id,
			clientId: data.clientId,
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
		account: account,
		token: {
			access: accessToken,
			refresh: refreshToken,
		},
	};
};

export default { Serializer, Authorize, Handler };
