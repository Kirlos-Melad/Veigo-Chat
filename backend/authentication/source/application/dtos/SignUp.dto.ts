import { z } from "zod";

import { Dto } from "./Dto";
import AccountEntity from "@source/domain/entities/Account.entity";
import DeviceEntity from "@source/domain/entities/Device.entity";
import PasswordHandler from "../utilities/PasswordHandler";

type SignUpSerialized = Optional<
	Pick<AccountEntity, "email" | "password" | "phone">,
	"phone"
> &
	Pick<DeviceEntity, "clientId">;

class SignUpDto extends Dto<SignUpSerialized> {
	constructor(data: any) {
		super(
			data,
			z.object({
				email: z.string().email(),
				password: PasswordHandler.schema.transform(
					PasswordHandler.hash,
				),
				clientId: z.string(),
				phone: z.string().optional(),
			}),
		);
	}
}

export default SignUpDto;
export type { SignUpSerialized };
