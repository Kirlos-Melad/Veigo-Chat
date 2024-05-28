import { z } from "zod";

import { Dto } from "../../types/Dto";
import PasswordHandler from "../utilities/PasswordHandler";

type ChangePassword = {
	email: string;
	oldPassword: string;
	newPassword: string;
};

class ChangePasswordDto extends Dto<ChangePassword> {
	constructor(data: any) {
		super(
			data,
			z.object({
				email: z.string().email(),
				oldPassword: PasswordHandler.schema,
				newPassword: PasswordHandler.schema.transform(
					PasswordHandler.hash,
				),
			}),
		);
	}
}

export default ChangePasswordDto;
export type { ChangePassword };
