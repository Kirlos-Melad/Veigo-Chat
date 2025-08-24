import { DeviceEntity } from "@source/domain/entities/Device.entity";

type SignOutDto = Pick<DeviceEntity, "accountId" | "clientId">;

export type { SignOutDto };
