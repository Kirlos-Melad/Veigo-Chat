import {
    Dto,
    SignOutSerialized,
} from "@source/application/dtos";
import { EmptyObject } from "@source/types/generated/protos/common_objects/EmptyObject";
import { SignOutRequest } from "@source/types/generated/protos/authentication/SignOutRequest";
import { IUseCase } from "./IUseCase";
import { IDeviceRepository } from "../repositories/IDevice.repository";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";

class SignOutUseCase
    implements IUseCase<SignOutRequest, SignOutSerialized, EmptyObject>
{
    private _dto: Dto<SignOutSerialized>;
    private _repository: IDeviceRepository;

    public constructor(
        dto: Dto<SignOutSerialized>,
        repository: IDeviceRepository,
    ) {
        this._dto = dto;
        this._repository = repository;
    }

    public serialize = (data: SignOutRequest): SignOutSerialized =>
        this._dto.serialize(data);

    public authorize = async (): Promise<boolean> =>
        await new Promise((resolve) => {
            resolve(true);
        });

    public handle = async (
        connection: DatabaseClient,
        data: SignOutSerialized & { requesterId?: string },
    ): Promise<EmptyObject> => {
        await this._repository.update(
            connection,
            {
                accountId: data.requesterId!,
                clientId: data.clientId,
            },
            {
                forceSignIn: true,
            },
        );

        return {};
    };
}

export { SignOutUseCase };
