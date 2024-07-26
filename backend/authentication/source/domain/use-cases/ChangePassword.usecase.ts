import bcrypt from "bcrypt";

import { ChangePasswordSerialized, Dto } from "@source/application/dtos";
import { ChangePasswordRequest } from "@source/types/generated/protos/authentication/ChangePasswordRequest";
import { EmptyObject } from "@source/types/generated/protos/common_objects/EmptyObject";
import { IUseCase } from "./IUseCase";
import { Metadata } from "@grpc/grpc-js";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { IAccountRepository } from "../repositories/IAccount.repository";
import { AuthorizationManager } from "@source/application/utilities/AuthorizationManager";

class ChangePasswordUseCase
    implements
        IUseCase<ChangePasswordRequest, ChangePasswordSerialized, EmptyObject>
{
    private _dto: Dto<ChangePasswordSerialized>;
    private _repository: IAccountRepository;

    public constructor(
        dto: Dto<ChangePasswordSerialized>,
        repository: IAccountRepository,
    ) {
        this._dto = dto;
        this._repository = repository;
    }

    public serialize = (
        data: ChangePasswordRequest,
    ): ChangePasswordSerialized => this._dto.serialize(data);

    //? Guarantee that the user exists
    public authorize = async (metadata: Metadata): Promise<string> =>
        await AuthorizationManager.instance.getUserId(metadata);

    public handle = async (
        connection: DatabaseClient,
        data: ChangePasswordSerialized & { requesterId?: string },
    ): Promise<EmptyObject> => {
        const account = await this._repository.findById(connection, {
            id: data.requesterId!,
        });

        if (
            !account ||
            !bcrypt.compareSync(data.oldPassword, account.password!)
        ) {
            throw new Error("Invalid password");
        }

        await this._repository.update(
            connection,
            { id: data.requesterId! },
            { password: data.newPassword },
        );

        return {};
    };
}

export { ChangePasswordUseCase };
