import { z } from "zod";
import { Dto } from "./Dto";

type VerifyEmail = {
	email: string;
	otp: string;
};

class VerifyEmailDto extends Dto<VerifyEmail> {
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

export default VerifyEmailDto;
export type { VerifyEmail };
