import { z } from "zod";
import { Dto } from "@source/application/dtos/Dto";
import { AccountEntity } from "@source/domain/entities/Account.entity";
import { DeviceEntity } from "@source/domain/entities/Device.entity";

type SignInSerialized = Required<
    Pick<AccountEntity, "email" | "password"> & Pick<DeviceEntity, "clientId">
>;

class SignInDto extends Dto<SignInSerialized> {
    public constructor() {
        super(
            z.object({
                email: z.string().email(),
                password: z.string(),
                clientId: z.string(),
            }),
        );
    }
}

export { SignInDto };
export type { SignInSerialized };
