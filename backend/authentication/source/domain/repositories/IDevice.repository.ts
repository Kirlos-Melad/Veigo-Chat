import DeviceEntity from "source/domain/entities/Device.entity";
import { DatabaseClient } from "source/infrastructure/database/DatabaseManager";

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

type DeviceUpdate = {
	accessTokenId?: string;
	refreshTokenId?: string;
	forceRefreshToken?: boolean;
	forceSignIn?: boolean;
};

interface IDeviceRepository {
	Create(
		connection: DatabaseClient,
		device: DeviceCreate,
	): Promise<DeviceEntity>;

	Read(
		connection: DatabaseClient,
		device: DeviceRead,
	): Promise<DeviceEntity | undefined>;

	Update(
		connection: DatabaseClient,
		filter: DeviceRead,
		update: DeviceUpdate,
	): Promise<DeviceEntity>;

	Upsert(
		connection: DatabaseClient,
		filter: DeviceRead,
		update: DeviceUpdate,
	): Promise<DeviceEntity>;
}

export default IDeviceRepository;
export type { DeviceCreate, DeviceRead, DeviceUpdate };
