import { DeviceEntity } from "@source/domain/entities/Device.entity";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";

type DeviceCreate = {
    accountId: string;
    clientId: string;
    accessTokenId: string;
    refreshTokenId: string;
};

type DeviceRead = {
    accountId: string;
    clientId: string;
};

type DevicesList = {
    accountId: string;
    from?: string;
    limit: number;
};

type DeviceUpdate = {
    accessTokenId?: string;
    refreshTokenId?: string;
    forceRefreshToken?: boolean;
    forceSignIn?: boolean;
};

interface IDeviceRepository {
    create(
        connection: DatabaseClient,
        device: DeviceCreate,
    ): Promise<DeviceEntity>;

    read(
        connection: DatabaseClient,
        device: DeviceRead,
    ): Promise<DeviceEntity | undefined>;

    list(
        connection: DatabaseClient,
        filter: DevicesList,
    ): Promise<DeviceEntity[]>;

    update(
        connection: DatabaseClient,
        filter: DeviceRead,
        update: DeviceUpdate,
    ): Promise<DeviceEntity>;

    upsert(
        connection: DatabaseClient,
        filter: DeviceRead,
        update: DeviceUpdate,
    ): Promise<DeviceEntity>;
}

export type {
    IDeviceRepository,
    DeviceCreate,
    DeviceRead,
    DevicesList,
    DeviceUpdate,
};
