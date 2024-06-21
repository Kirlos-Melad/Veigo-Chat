import { z } from "zod";

import { Dto } from "./Dto";
import PasswordHandler from "../utilities/PasswordHandler";

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
