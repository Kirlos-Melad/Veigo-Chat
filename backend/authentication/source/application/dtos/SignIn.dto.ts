import { z } from "zod";
import { Dto } from "../../types/Dto";
import AccountEntity from "@root/source/domain/entities/Account.entity";
import DeviceEntity from "@root/source/domain/entities/Device.entity";
import PasswordHandler from "../utilities/PasswordHandler";

type SignIn = Pick<AccountEntity, "email" | "password"> &
	Pick<DeviceEntity, "clientId">;

class SignInDto extends Dto<SignIn> {
	constructor(data: any) {
		super(
			data,
			z.object({
				email: z.string().email(),
				password: PasswordHandler.schema,
				clientId: z.string(),
			}),
		);
	}
}

export default SignInDto;
export type { SignIn };
