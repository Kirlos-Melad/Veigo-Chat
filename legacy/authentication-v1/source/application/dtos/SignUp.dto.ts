import { AccountEntity } from "@source/domain/entities/Account.entity";
import { DeviceEntity } from "@source/domain/entities/Device.entity";
import { Optional } from "@source/types/Optional";

type SignUpDto = Optional<
    Pick<AccountEntity, "email" | "password" | "phone">,
    "phone"
> &
    Pick<DeviceEntity, "clientId">;

export type { SignUpDto };
