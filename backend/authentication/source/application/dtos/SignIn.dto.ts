import { z } from "zod";
import { Dto } from "@source/application/dtos/Dto";
import AccountEntity from "@source/domain/entities/Account.entity";
import DeviceEntity from "@source/domain/entities/Device.entity";
import PasswordHandler from "@source/application/utilities/PasswordHandler";

type SignInSerialized = Pick<AccountEntity, "email" | "password"> &
	Pick<DeviceEntity, "clientId">;

class SignInDto extends Dto<SignInSerialized> {
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
export type { SignInSerialized };
