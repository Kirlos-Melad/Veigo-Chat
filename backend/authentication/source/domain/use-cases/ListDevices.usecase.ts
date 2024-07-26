import { Dto, ListDevicesSerialized } from "@source/application/dtos";
import { DeviceObjectPage } from "@source/types/generated/protos/authentication_objects/DeviceObjectPage";
import { PaginationRequest } from "@source/types/generated/protos/common_objects/PaginationRequest";
import { IUseCase } from "./IUseCase";
import { IDeviceRepository } from "../repositories/IDevice.repository";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { AuthorizationManager } from "@source/application/utilities/AuthorizationManager";
import { Metadata } from "@grpc/grpc-js";

class ListDevicesUseCase
    implements
        IUseCase<PaginationRequest, ListDevicesSerialized, DeviceObjectPage>
{
    private _dto: Dto<ListDevicesSerialized>;
    private _repository: IDeviceRepository;

    public constructor(
        dto: Dto<ListDevicesSerialized>,
        repository: IDeviceRepository,
    ) {
        this._dto = dto;
        this._repository = repository;
    }

    public serialize = (data: PaginationRequest): ListDevicesSerialized =>
        this._dto.serialize(data);

    public authorize = async (metadata: Metadata): Promise<string> =>
        await AuthorizationManager.instance.getUserId(metadata);

    public handle = async (
        connection: DatabaseClient,
        data: ListDevicesSerialized & { requesterId?: string },
    ): Promise<DeviceObjectPage> => {
        const devicesList = await this._repository.list(connection, {
            accountId: data.requesterId!,
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
    };
}

export { ListDevicesUseCase };
