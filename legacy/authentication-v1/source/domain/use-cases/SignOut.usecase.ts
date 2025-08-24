import { z } from "zod";

import { SignOutDto } from "@source/application/dtos";
import { EmptyObject } from "@source/types/generated/protos/common_objects/EmptyObject";
import { UseCase } from "./UseCase";
import { IDeviceRepository } from "../repositories/IDevice.repository";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { SignOutRequest } from "@source/types/generated/protos/authentication/SignOutRequest";

class SignOutUseCase extends UseCase<SignOutRequest, SignOutDto, EmptyObject> {
    private _repository: IDeviceRepository;

    public constructor(repository: IDeviceRepository) {
        super(
            z.object({
                accountId: z.string(),
                clientId: z.string(),
            }),
        );
        this._repository = repository;
    }

    public authorize = async (): Promise<boolean> =>
        await new Promise((resolve) => {
            resolve(true);
        });

    public handle = async (
        connection: DatabaseClient,
        data: SignOutDto & { requesterId?: string },
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
