import bcrypt from "bcrypt";

import AuthenticationDto, {
    ChangePasswordSerialized,
} from "@source/application/dtos";
import { ChangePasswordRequest } from "@source/types/generated/protos/authentication/ChangePasswordRequest";
import { EmptyObject } from "@source/types/generated/protos/common_objects/EmptyObject";
import AccountRepository from "@source/infrastructure/database/repositories/Account.repository";
import {
    AuthorizationFunction,
    HandlerFunction,
    SerializerFunction,
} from "@source/application/utilities/TransactionalCall";

export const ChangePasswordUseCase: {
    Serializer: SerializerFunction<
        ChangePasswordRequest,
        ChangePasswordSerialized
    >;

    Authorize: AuthorizationFunction<ChangePasswordSerialized>;

    Handler: HandlerFunction<
        ChangePasswordSerialized & { requesterId: string },
        EmptyObject
    >;
} = {
    Serializer: (data) => AuthenticationDto.ChangePassword(data),

    Authorize: async () => true,

    Handler: async (connection, data) => {
        const account = await AccountRepository.FindById(connection, {
            id: data.requesterId,
        });

        if (
            !account ||
            !bcrypt.compareSync(data.oldPassword, account.password!)
        ) {
            throw new Error("Invalid password");
        }

        await AccountRepository.Update(
            connection,
            { id: data.requesterId },
            { password: data.newPassword },
        );

        return {};
    },
};
