import { z } from "zod";
import { Dto } from "../../types/Dto";

type ForgetPassword = { email: string };

class ForgetPasswordDto extends Dto<ForgetPassword> {
	constructor(data: any) {
		super(
			data,
			z.object({
				email: z.string().email(),
			}),
		);
	}
}

export default ForgetPasswordDto;
export type { ForgetPassword };
