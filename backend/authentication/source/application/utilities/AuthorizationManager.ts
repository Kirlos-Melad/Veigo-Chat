import Logger from "@source/application/utilities/Logger";
import { Metadata } from "@grpc/grpc-js";
import JsonWebToken from "@source/application/utilities/JsonWebToken";
import DeviceRepository from "@source/infrastructure/database/repositories/Device.repository";
import DatabaseManager from "@source/infrastructure/database/DatabaseManager";

class AuthorizationManager {
    private static sInstance: AuthorizationManager;

    public static get instance(): AuthorizationManager {
        if (!AuthorizationManager.sInstance) {
            throw new Error("AuthorizationManager not initialized");
        }

        return AuthorizationManager.sInstance;
    }

    public async GetUserId(metadata: Metadata): Promise<string> {
        let token: string | null;
        try {
            token = metadata.get("token")[0].toString();
        } catch (error) {
            Logger.error(error);
            throw new Error("Unauthorized action");
        }

        const { id, subject } = await JsonWebToken.VerifyAccessToken(token);

        const conn = await DatabaseManager.instance.LeaseConnection();
        const device = await DeviceRepository.Read(conn, {
            accountId: subject!.accountId,
            clientId: subject!.clientId,
        });

        if (!device || device.accessTokenId != id || device.forceRefreshToken) {
            throw new Error("Unauthorized action");
        }

        return subject!.accountId;
    }
}

export default new AuthorizationManager();
