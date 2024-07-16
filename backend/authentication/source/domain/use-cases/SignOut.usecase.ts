
import AuthenticationDto, { SignOutSerialized } from "@source/application/dtos";
import { EmptyObject } from "@source/types/generated/protos/common_objects/EmptyObject";
import {
	AuthorizationFunction,
	HandlerFunction,
	SerializerFunction,
} from "@source/application/utilities/TransactionalCall";
import { SignOutRequest } from "@source/types/generated/protos/authentication/SignOutRequest";
import DeviceRepository from "@source/infrastructure/database/repositories/Device.repository";

export const SignOutUseCase: {
	Serializer: SerializerFunction<SignOutRequest, SignOutSerialized>;

	Authorize: AuthorizationFunction<SignOutSerialized>;

	Handler: HandlerFunction<
		SignOutSerialized & { requesterId: string },
		EmptyObject
	>;
} = {
	Serializer: (data) => AuthenticationDto.SignOut(data),

	Authorize: async () => true,

	Handler: async (connection, data) => {
		await DeviceRepository.Update(
			connection,
			{
				accountId: data.requesterId,
				clientId: data.clientId,
			},
			{
				forceSignIn: true,
			},
		);

		return {};
	},
};
