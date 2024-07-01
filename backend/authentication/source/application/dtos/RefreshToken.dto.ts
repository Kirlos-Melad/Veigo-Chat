import { z } from "zod";
import { Dto } from "source/application/dtos/Dto";

type RefreshTokenSerialized = { token: string };

class RefreshTokenDto extends Dto<RefreshTokenSerialized> {
	constructor(data: any) {
		super(
			data,
			z.object({
				token: z.string(),
			}),
		);
	}
}

export default RefreshTokenDto;
export type { RefreshTokenSerialized };
