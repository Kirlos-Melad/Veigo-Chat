import AuthenticationDto, {
	ListDevicesSerialized,
} from "@source/application/dtos";
import DeviceRepository from "@source/infrastructure/database/repositories/Device.repository";
import { DeviceObjectPage } from "@source/types/generated/protos/authentication_objects/DeviceObjectPage";
import { PaginationRequest } from "@source/types/generated/protos/common_objects/PaginationRequest";
import {
	AuthorizationFunction,
	HandlerFunction,
	SerializerFunction,
} from "@source/application/utilities/TransactionalCall";

export const ListDevicesUseCase: {
	Serializer: SerializerFunction<PaginationRequest, ListDevicesSerialized>;

	Authorize: AuthorizationFunction<ListDevicesSerialized>;

	Handler: HandlerFunction<
		ListDevicesSerialized & { requesterId: string },
		DeviceObjectPage
	>;
} = {
	Serializer: (data) => AuthenticationDto.ListDevices(data),

	Authorize: async () => true,

	Handler: async (connection, data) => {
		const devicesList = await DeviceRepository.List(connection, {
			accountId: data.requesterId,
			from: data.cursor,
			limit: data.size! + 1,
		});

		const hasNext = devicesList.length > data.size!;
		const cursor = hasNext ? devicesList.pop()!.clientId : undefined;

		return {
			records: devicesList,
			metadata: {
				cursor: cursor,
				hasMore: hasNext,
			},
		};
	},
};
