import { z } from "zod";
import { Dto } from "source/application/dtos/Dto";

type SendEmailVerification = { email: string };

class SendEmailVerificationDto extends Dto<SendEmailVerification> {
	constructor(data: any) {
		super(
			data,
			z.object({
				email: z.string().email(),
			}),
		);
	}
}

export default SendEmailVerificationDto;
export type { SendEmailVerification };
