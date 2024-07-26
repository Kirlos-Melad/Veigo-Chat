import { z } from "zod";
import { Dto } from "@source/application/dtos/Dto";

type SendEmailVerification = { email: string };

class SendEmailVerificationDto extends Dto<SendEmailVerification> {
    public constructor() {
        super(
            z.object({
                email: z.string().email(),
            }),
        );
    }
}

export { SendEmailVerificationDto };
export type { SendEmailVerification };
