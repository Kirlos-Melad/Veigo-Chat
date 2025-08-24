interface DeviceEntity {
    accountId: string;
    clientId: string;

    accessTokenId: string;
    forceRefreshToken: boolean;

    refreshTokenId: string;
    forceSignIn: boolean;

    createdAt: string;
    updatedAt: string;
}

function isDeviceEntity(data: unknown): data is DeviceEntity {
    if (typeof data != "object" || data == null || Array.isArray(data))
        return false;

    const checker = data as DeviceEntity;

    return (
        typeof checker.accountId === "string" &&
        typeof checker.clientId === "string" &&
        typeof checker.accessTokenId === "string" &&
        typeof checker.refreshTokenId === "string" &&
        typeof checker.forceRefreshToken === "boolean" &&
        typeof checker.forceSignIn === "boolean" &&
        typeof checker.createdAt === "string" &&
        typeof checker.updatedAt === "string"
    );
}

export type { DeviceEntity };
export { isDeviceEntity };
