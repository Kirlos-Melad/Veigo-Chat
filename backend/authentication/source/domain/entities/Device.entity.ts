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

function IsDeviceEntity(data: any): data is DeviceEntity {
    return (
        data &&
        typeof data === "object" &&
        !Array.isArray(data) &&
        typeof data.accountId === "string" &&
        typeof data.clientId === "string" &&
        typeof data.accessTokenId === "string" &&
        typeof data.refreshTokenId === "string" &&
        typeof data.forceRefreshToken === "boolean" &&
        typeof data.forceSignIn === "boolean" &&
        typeof data.createdAt === "string" &&
        typeof data.updatedAt === "string"
    );
}

export default DeviceEntity;
export { IsDeviceEntity };
