import { z } from "zod";
import { Dto } from "@source/application/dtos/Dto";

type ValidateOTP = {
    email: string;
    otp: string;
};

class ValidateOTPDto extends Dto<ValidateOTP> {
    public constructor() {
        super(
            z.object({
                email: z.string().email(),
                otp: z.string(),
            }),
        );
    }
}

export { ValidateOTPDto };
export type { ValidateOTP };
