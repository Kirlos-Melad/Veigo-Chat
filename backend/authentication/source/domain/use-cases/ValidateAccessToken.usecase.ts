import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { Dto, ValidateAccessTokenSerialized } from "@source/application/dtos";
import { JsonWebTokenManager } from "@source/application/utilities/JsonWebTokenManager";
import { TokenRequest } from "@source/types/generated/protos/authentication/TokenRequest";
import { Logger } from "@source/application/utilities/Logger";
import { EmptyObject } from "@source/types/generated/protos/common_objects/EmptyObject";
import { IUseCase } from "./IUseCase";
import { IDeviceRepository } from "../repositories/IDevice.repository";

const logger = Logger.instance;

class ValidateAccessTokenUseCase
    implements
        IUseCase<TokenRequest, ValidateAccessTokenSerialized, EmptyObject>
{
    private _dto: Dto<ValidateAccessTokenSerialized>;
    private _repository: IDeviceRepository;

    public constructor(
        dto: Dto<ValidateAccessTokenSerialized>,
        repository: IDeviceRepository,
    ) {
        this._dto = dto;
        this._repository = repository;
    }

    public serialize = (data: TokenRequest): ValidateAccessTokenSerialized =>
        this._dto.serialize(data);

    public authorize = async (): Promise<boolean> =>
        await new Promise((resolve) => {
            resolve(true);
        });

    public handle = async (
        connection: DatabaseClient,
        data: ValidateAccessTokenSerialized,
    ): Promise<EmptyObject> => {
        // Validate the access token
        const jwt = await JsonWebTokenManager.instance.verifyAccessToken(
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
        if (device.accessTokenId !== jwt.id || device.forceRefreshToken) {
            logger.error(`Token must be refreshed`);
            throw new Error("Invalid token");
        }

        // Success
        return {};
    };
}

export { ValidateAccessTokenUseCase };
