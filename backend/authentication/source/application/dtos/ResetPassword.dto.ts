import { z } from "zod";

import { Dto } from "source/application/dtos/Dto";
import PasswordHandler from "source/application/utilities/PasswordHandler";

type ResetPassword = {
	email: string;
	otp: string;
	newPassword: string;
};

class ResetPasswordDto extends Dto<ResetPassword> {
	constructor(data: any) {
		super(
			data,
			z.object({
				email: z.string().email(),
				otp: z.string(),
				newPassword: PasswordHandler.schema.transform(
					PasswordHandler.hash,
				),
			}),
		);
	}
}

export default ResetPasswordDto;
export type { ResetPassword };
