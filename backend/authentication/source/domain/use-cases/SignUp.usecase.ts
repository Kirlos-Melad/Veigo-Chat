import { ulid } from "ulidx";

import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { SignUpRequest } from "@source/types/generated/protos/authentication/SignUpRequest";
import { SignUpSerialized, Dto } from "@source/application/dtos";
import { JsonWebTokenManager } from "@source/application/utilities/JsonWebTokenManager";
import { AuthenticationResponse } from "@source/types/generated/protos/authentication/AuthenticationResponse";
import { IUseCase } from "./IUseCase";
import { IAccountRepository } from "../repositories/IAccount.repository";
import { IDeviceRepository } from "../repositories/IDevice.repository";

class SignUpUseCase
    implements
        IUseCase<SignUpRequest, SignUpSerialized, AuthenticationResponse>
{
    private _dto: Dto<SignUpSerialized>;
    private _repositories: {
        account: IAccountRepository;
        device: IDeviceRepository;
    };

    public constructor(
        dto: Dto<SignUpSerialized>,
        repositories: {
            account: IAccountRepository;
            device: IDeviceRepository;
        },
    ) {
        this._dto = dto;
        this._repositories = repositories;
    }

    public serialize = (data: SignUpRequest): SignUpSerialized =>
        this._dto.serialize(data);

    public authorize = async (): Promise<boolean> =>
        await new Promise((resolve) => {
            resolve(true);
        });

    public handle = async (
        connection: DatabaseClient,
        data: SignUpSerialized,
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
