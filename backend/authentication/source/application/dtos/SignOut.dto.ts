import { z } from "zod";
import { Dto } from "source/application/dtos/Dto";
import DeviceEntity from "source/domain/entities/Device.entity";

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
