import { z } from "zod";

import { Dto } from "@source/application/dtos/Dto";
import { passwordHandler } from "@source/application/utilities/PasswordHandler";

type ResetPassword = {
    email: string;
    otp: string;
    newPassword: string;
};

class ResetPasswordDto extends Dto<ResetPassword> {
    public constructor() {
        super(
            z.object({
                email: z.string().email(),
                otp: z.string(),
                newPassword: passwordHandler.schema.transform(
                    passwordHandler.hash,
                ),
            }),
        );
    }
}

export { ResetPasswordDto };
export type { ResetPassword };
