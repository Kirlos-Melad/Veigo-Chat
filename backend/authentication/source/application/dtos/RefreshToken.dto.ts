import { z } from "zod";
import { Dto } from "../../types/Dto";

type RefreshToken = { token: string };

class RefreshTokenDto extends Dto<RefreshToken> {
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
export type { RefreshToken };
