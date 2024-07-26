import { z } from "zod";
import { Dto } from "@source/application/dtos/Dto";

type ForgetPassword = { email: string };

class ForgetPasswordDto extends Dto<ForgetPassword> {
    public constructor() {
        super(
            z.object({
                email: z.string().email(),
            }),
        );
    }
}

export { ForgetPasswordDto };
export type { ForgetPassword };
