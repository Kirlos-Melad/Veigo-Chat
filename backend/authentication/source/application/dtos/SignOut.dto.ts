import { z } from "zod";
import { Dto } from "@source/application/dtos/Dto";
import { DeviceEntity } from "@source/domain/entities/Device.entity";

type SignOutSerialized = Pick<DeviceEntity, "accountId" | "clientId">;

class SignOutDto extends Dto<SignOutSerialized> {
    public constructor() {
        super(
            z.object({
                accountId: z.string(),
                clientId: z.string(),
            }),
        );
    }
}

export { SignOutDto };
export type { SignOutSerialized };
