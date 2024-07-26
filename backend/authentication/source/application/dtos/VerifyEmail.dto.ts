import { z } from "zod";
import { Dto } from "@source/application/dtos/Dto";

type VerifyEmail = {
    email: string;
    otp: string;
};

class VerifyEmailDto extends Dto<VerifyEmail> {
    public constructor() {
        super(
            z.object({
                email: z.string().email(),
                otp: z.string(),
            }),
        );
    }
}

export { VerifyEmailDto };
export type { VerifyEmail };
