import { z } from "zod";

import { Dto } from "@source/application/dtos/Dto";
import { passwordHandler } from "@source/application/utilities/PasswordHandler";

type ChangePasswordSerialized = {
    oldPassword: string;
    newPassword: string;
};

class ChangePasswordDto extends Dto<ChangePasswordSerialized> {
    public constructor() {
        super(
            z.object({
                oldPassword: passwordHandler.schema,
                newPassword: passwordHandler.schema.transform(
                    passwordHandler.hash,
                ),
            }),
        );
    }
}

export { ChangePasswordDto };
export type { ChangePasswordSerialized };
