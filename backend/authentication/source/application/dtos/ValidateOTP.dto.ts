import { z } from "zod";
import { Dto } from "@source/application/dtos/Dto";

type ValidateOTP = {
    email: string;
    otp: string;
};

class ValidateOTPDto extends Dto<ValidateOTP> {
    constructor(data: any) {
        super(
            data,
            z.object({
                email: z.string().email(),
                otp: z.string(),
            }),
        );
    }
}

export default ValidateOTPDto;
export type { ValidateOTP };
