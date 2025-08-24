import { z } from "zod";
import bcrypt from "bcrypt";

import { ChangePasswordDto } from "@source/application/dtos";
import { EmptyObject } from "@source/types/generated/protos/common_objects/EmptyObject";
import { UseCase } from "./UseCase";
import { Metadata } from "@grpc/grpc-js";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { IAccountRepository } from "../repositories/IAccount.repository";
import { AuthorizationManager } from "@source/application/utilities/AuthorizationManager";
import { passwordHandler } from "@source/application/utilities/PasswordHandler";
import { ChangePasswordRequest } from "@source/types/generated/protos/authentication/ChangePasswordRequest";

class ChangePasswordUseCase extends UseCase<
    ChangePasswordRequest,
    ChangePasswordDto,
    EmptyObject
> {
    private _repository: IAccountRepository;

    public constructor(repository: IAccountRepository) {
        super(
            z.object({
                oldPassword: passwordHandler.schema,
                newPassword: passwordHandler.schema.transform(
                    passwordHandler.hash,
                ),
            }),
        );
        this._repository = repository;
    }

    //? Guarantee that the user exists
    public authorize = async (metadata: Metadata): Promise<string> =>
        await AuthorizationManager.instance.getUserId(metadata);

    public handle = async (
        connection: DatabaseClient,
        data: ChangePasswordDto & { requesterId?: string },
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
