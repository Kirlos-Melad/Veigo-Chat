import { AccountEntity } from "@source/domain/entities/Account.entity";
import { DeviceEntity } from "@source/domain/entities/Device.entity";

type SignInDto = Required<
    Pick<AccountEntity, "email" | "password"> & Pick<DeviceEntity, "clientId">
>;

export type { SignInDto };
