import { ulid } from "ulidx";

import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { Dto } from "@source/application/dtos";
import { JsonWebTokenManager } from "@source/application/utilities/JsonWebTokenManager";
import { TokenRequest } from "@source/types/generated/protos/authentication/TokenRequest";
import { Logger } from "@source/application/utilities/Logger";
import { RefreshTokenSerialized } from "@source/application/dtos/RefreshToken.dto";
import { TokenObject } from "@source/types/generated/protos/authentication_objects/TokenObject";
import { IUseCase } from "./IUseCase";
import { IDeviceRepository } from "../repositories/IDevice.repository";

const logger = Logger.instance;

class RefreshTokenUseCase
    implements IUseCase<TokenRequest, RefreshTokenSerialized, TokenObject>
{
    private _dto: Dto<RefreshTokenSerialized>;
    private _repository: IDeviceRepository;

    public constructor(
        dto: Dto<RefreshTokenSerialized>,
        repository: IDeviceRepository,
    ) {
        this._dto = dto;
        this._repository = repository;
    }

    public serialize = (data: TokenRequest): RefreshTokenSerialized =>
        this._dto.serialize(data);

    public authorize = async (): Promise<boolean> =>
        await new Promise((resolve) => {
            resolve(true);
        });

    public handle = async (
        connection: DatabaseClient,
        data: RefreshTokenSerialized,
    ): Promise<TokenObject> => {
        // Validate the access token
        const jwt = await JsonWebTokenManager.instance.verifyRefreshToken(
            data.token,
        );

        // Check if the device exists
        const device = await this._repository.read(connection, {
            accountId: jwt.subject.accountId,
            clientId: jwt.subject.clientId,
        });
        if (!device) {
            logger.error(`Device not found`);
            throw new Error("Invalid token");
        }

        // Check if the token is still valid
        if (device.refreshTokenId !== jwt.id || device.forceSignIn) {
            logger.error(`User must sign in again`);
            await this._repository.update(
                connection,
                {
                    accountId: jwt.subject.accountId,
                    clientId: jwt.subject.clientId,
                },
                { forceSignIn: true },
            );
            throw new Error("Invalid token");
        }

        const nDevice = await this._repository.update(
            connection,
            {
                accountId: jwt.subject.accountId,
                clientId: jwt.subject.clientId,
            },
            {
                accessTokenId: ulid(),
                refreshTokenId: ulid(),
                forceSignIn: false,
                forceRefreshToken: false,
            },
        );

        const [accessToken, refreshToken] = await Promise.all([
            JsonWebTokenManager.instance.generateAccessToken({
                id: nDevice.accessTokenId,
                subject: {
                    accountId: nDevice.accountId,
                    clientId: nDevice.clientId,
                },
            }),
            JsonWebTokenManager.instance.generateRefreshToken({
                id: nDevice.refreshTokenId,
                subject: {
                    accountId: nDevice.accountId,
                    clientId: nDevice.clientId,
                },
            }),
        ]);

        return { access: accessToken, refresh: refreshToken };
    };
}

export { RefreshTokenUseCase };
