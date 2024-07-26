import { Metadata } from "@grpc/grpc-js";

import { Logger } from "@source/application/utilities/Logger";
import { JsonWebTokenManager } from "@source/application/utilities/JsonWebTokenManager";
import {
    DatabaseClient,
    DatabaseManager,
} from "@source/infrastructure/database/DatabaseManager";
import { IDeviceRepository } from "@source/domain/repositories/IDevice.repository";

class AuthorizationManager {
    private static _instance: AuthorizationManager;

    private _jwtManager: JsonWebTokenManager;
    private _dbManager: DatabaseManager;
    private _deviceRepository: IDeviceRepository;

    private constructor(configurations: {
        jwtManager: JsonWebTokenManager;
        dbManager: DatabaseManager;
        deviceRepository: IDeviceRepository;
    }) {
        this._jwtManager = configurations.jwtManager;
        this._dbManager = configurations.dbManager;
        this._deviceRepository = configurations.deviceRepository;
    }

    public static createInstance(configurations: {
        jwtManager: JsonWebTokenManager;
        dbManager: DatabaseManager;
        deviceRepository: IDeviceRepository;
    }): AuthorizationManager {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!AuthorizationManager._instance) {
            AuthorizationManager._instance = new AuthorizationManager(
                configurations,
            );
        }

        return AuthorizationManager._instance;
    }

    public static get instance(): AuthorizationManager {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!AuthorizationManager._instance) {
            throw new Error("AuthorizationManager is not initialized");
        }

        return AuthorizationManager._instance;
    }

    public async getUserId(metadata: Metadata): Promise<string> {
        let token: string | null;
        try {
            token = metadata.get("token")[0].toString();
        } catch (error) {
            Logger.instance.error(error);
            throw new Error("Unauthorized action");
        }

        const { id, subject } = await this._jwtManager.verifyAccessToken(token);

        let conn: DatabaseClient | undefined;
        try {
            conn = await this._dbManager.leaseConnection();
            const device = await this._deviceRepository.read(conn, {
                accountId: subject.accountId,
                clientId: subject.clientId,
            });

            if (
                !device ||
                device.accessTokenId != id ||
                device.forceRefreshToken
            ) {
                throw new Error("Unauthorized action");
            }

            await conn.release();

            return subject.accountId;
        } catch (error) {
            await conn?.release();
            throw error;
        }
    }
}

export { AuthorizationManager };
