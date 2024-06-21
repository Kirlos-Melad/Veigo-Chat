import { z } from "zod";
import { Dto } from "./Dto";
import DeviceEntity from "@root/source/domain/entities/Device.entity";

type SignOut = Pick<DeviceEntity, "accountId" | "clientId">;

class SignOutDto extends Dto<SignOut> {
	constructor(data: any) {
		super(
			data,
			z.object({
				accountId: z.string(),
				clientId: z.string(),
			}),
		);
	}
}

export default SignOutDto;
export type { SignOut };
