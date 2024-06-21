import { z } from "zod";
import { Dto } from "./Dto";

type ValidateAccessTokenSerialized = { token: string };

class ValidateAccessTokenDto extends Dto<ValidateAccessTokenSerialized> {
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
export type { ValidateAccessTokenSerialized };
