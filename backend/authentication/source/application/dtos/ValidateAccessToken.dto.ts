import { z } from "zod";
import { Dto } from "../../types/Dto";

type ValidateAccessToken = { token: string };

class ValidateAccessTokenDto extends Dto<ValidateAccessToken> {
	constructor(data: any) {
		super(
			data,
			z.object({
				token: z.string(),
			}),
		);
	}
}

export default ValidateAccessTokenDto;
export type { ValidateAccessToken };
