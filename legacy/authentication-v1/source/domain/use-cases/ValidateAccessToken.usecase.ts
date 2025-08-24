import { z } from "zod";

import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { ValidateAccessTokenDto } from "@source/application/dtos";
import { JsonWebTokenManager } from "@source/application/utilities/JsonWebTokenManager";
import { Logger } from "@source/application/utilities/Logger";
import { EmptyObject } from "@source/types/generated/protos/common_objects/EmptyObject";
import { UseCase } from "./UseCase";
import { IDeviceRepository } from "../repositories/IDevice.repository";
import { TokenRequest } from "@source/types/generated/protos/authentication/TokenRequest";

const logger = Logger.instance;

class ValidateAccessTokenUseCase extends UseCase<
    TokenRequest,
    ValidateAccessTokenDto,
    EmptyObject
> {
    private _repository: IDeviceRepository;

    public constructor(repository: IDeviceRepository) {
        super(
            z.object({
                token: z.string(),
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
        data: ValidateAccessTokenDto,
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
