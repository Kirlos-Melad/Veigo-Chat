import { ulid } from "ulidx";
import bcrypt from "bcrypt";

import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { SignInSerialized } from "@source/application/dtos";
import { JsonWebTokenManager } from "@source/application/utilities/JsonWebTokenManager";
import { SignInRequest } from "@source/types/generated/protos/authentication/SignInRequest";
import { AuthenticationResponse } from "@source/types/generated/protos/authentication/AuthenticationResponse";
import { IUseCase } from "./IUseCase";
import { Dto } from "../../application/dtos/Dto";
import { IAccountRepository } from "../repositories/IAccount.repository";
import { IDeviceRepository } from "../repositories/IDevice.repository";

class SignInUseCase
    implements
        IUseCase<SignInRequest, SignInSerialized, AuthenticationResponse>
{
    private _dto: Dto<SignInSerialized>;
    private _repositories: {
        account: IAccountRepository;
        device: IDeviceRepository;
    };

    public constructor(
        dto: Dto<SignInSerialized>,
        repositories: {
            account: IAccountRepository;
            device: IDeviceRepository;
        },
    ) {
        this._dto = dto;
        this._repositories = repositories;
    }

    public serialize = (data: SignInRequest): SignInSerialized =>
        this._dto.serialize(data);

    public authorize = async (): Promise<boolean> =>
        await new Promise((resolve) => {
            resolve(true);
        });

    public handle = async (
        connection: DatabaseClient,
        data: SignInSerialized,
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
