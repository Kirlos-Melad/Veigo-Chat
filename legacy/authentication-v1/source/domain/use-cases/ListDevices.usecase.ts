import { Metadata } from "@grpc/grpc-js";
import { z } from "zod";

import { ListDevicesDto } from "@source/application/dtos";
import { DeviceObjectPage } from "@source/types/generated/protos/authentication_objects/DeviceObjectPage";
import { UseCase } from "./UseCase";
import { IDeviceRepository } from "../repositories/IDevice.repository";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { AuthorizationManager } from "@source/application/utilities/AuthorizationManager";
import { PaginationRequest } from "@source/types/generated/protos/common_objects/PaginationRequest";

class ListDevicesUseCase extends UseCase<
    PaginationRequest,
    ListDevicesDto,
    DeviceObjectPage
> {
    private _repository: IDeviceRepository;

    public constructor(repository: IDeviceRepository) {
        super(
            z.object({
                cursor: z.string().optional(),
                size: z.number().optional().default(10),
            }),
        );
        this._repository = repository;
    }

    public authorize = async (metadata: Metadata): Promise<string> =>
        await AuthorizationManager.instance.getUserId(metadata);

    public handle = async (
        connection: DatabaseClient,
        data: ListDevicesDto & { requesterId?: string },
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
