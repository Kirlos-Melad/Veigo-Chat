import { z } from "zod";

import { Dto } from "@source/application/dtos/Dto";
import { AccountEntity } from "@source/domain/entities/Account.entity";
import { DeviceEntity } from "@source/domain/entities/Device.entity";
import { passwordHandler } from "@source/application/utilities/PasswordHandler";
import { Optional } from "@source/types/Optional";

type SignUpSerialized = Optional<
    Pick<AccountEntity, "email" | "password" | "phone">,
    "phone"
> &
    Pick<DeviceEntity, "clientId">;

class SignUpDto extends Dto<SignUpSerialized> {
    public constructor() {
        super(
            z.object({
                email: z.string().email(),
                password: passwordHandler.schema.transform(
                    passwordHandler.hash,
                ),
                clientId: z.string(),
                phone: z.string().optional(),
            }),
        );
    }
}

export { SignUpDto };
export type { SignUpSerialized };
