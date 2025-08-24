import { z } from "zod";
import { ulid } from "ulidx";
import bcrypt from "bcrypt";

import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { JsonWebTokenManager } from "@source/application/utilities/JsonWebTokenManager";
import { AuthenticationResponse } from "@source/types/generated/protos/authentication/AuthenticationResponse";
import { IAccountRepository } from "../repositories/IAccount.repository";
import { IDeviceRepository } from "../repositories/IDevice.repository";
import { UseCase } from "./UseCase";
import { SignInDto } from "@source/application/dtos";
import { SignInRequest } from "@source/types/generated/protos/authentication/SignInRequest";

class SignInUseCase extends UseCase<
    SignInRequest,
    SignInDto,
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
                password: z.string(),
                clientId: z.string(),
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
        data: SignInDto,
    ): Promise<AuthenticationResponse> => {
        const account = await this._repositories.account.findByEmail(
            connection,
            {
                email: data.email,
            },
        );

        if (!account || !bcrypt.compareSync(data.password, account.password!)) {
            throw new Error("Invalid email or password");
        }

        const device = await this._repositories.device.upsert(
            connection,
            {
                accountId: account.id,
                clientId: data.clientId,
            },
            {
                accessTokenId: ulid(),
                refreshTokenId: ulid(),
                forceRefreshToken: false,
                forceSignIn: false,
            },
        );

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

export { SignInUseCase };
