import { z } from "zod";
import { ulid } from "ulidx";

import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { SignUpDto } from "@source/application/dtos";
import { JsonWebTokenManager } from "@source/application/utilities/JsonWebTokenManager";
import { AuthenticationResponse } from "@source/types/generated/protos/authentication/AuthenticationResponse";
import { UseCase } from "./UseCase";
import { IAccountRepository } from "../repositories/IAccount.repository";
import { IDeviceRepository } from "../repositories/IDevice.repository";
import { passwordHandler } from "@source/application/utilities/PasswordHandler";
import { SignUpRequest } from "@source/types/generated/protos/authentication/SignUpRequest";

class SignUpUseCase extends UseCase<
    SignUpRequest,
    SignUpDto,
    AuthenticationResponse
> {
    private _repositories: {
        account: IAccountRepository;
        device: IDeviceRepository;
    };

    public constructor(repositories: {
        account: IAccountRepository;
        device: IDeviceRepository;
    }) {
        super(
            z.object({
                email: z.string().email(),
                password: passwordHandler.schema.transform(
                    passwordHandler.hash,
                ),
                clientId: z.string(),
                phone: z.string().optional(),
            }),
        );
        this._repositories = repositories;
    }

    public authorize = async (): Promise<boolean> =>
        await new Promise((resolve) => {
            resolve(true);
        });

    public handle = async (
        connection: DatabaseClient,
        data: SignUpDto,
    ): Promise<AuthenticationResponse> => {
        const account = await this._repositories.account.create(connection, {
            email: data.email,
            password: data.password,
            phone: data.phone,
        });

        const device = await this._repositories.device.create(connection, {
            accountId: account.id,
            clientId: data.clientId,
            accessTokenId: ulid(),
            refreshTokenId: ulid(),
        });

        const [accessToken, refreshToken] = await Promise.all([
            JsonWebTokenManager.instance.generateAccessToken({
                id: device.accessTokenId,
                subject: {
                    accountId: device.accountId,
                    clientId: device.clientId,
                },
            }),
            JsonWebTokenManager.instance.generateRefreshToken({
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
}

export { SignUpUseCase };
