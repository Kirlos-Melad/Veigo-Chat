import { z } from "zod";
import { Dto } from "@source/application/dtos/Dto";

type DeleteAccount = { id: string };

class DeleteAccountDto extends Dto<DeleteAccount> {
	constructor(data: any) {
		super(
			data,
			z.object({
				id: z.string(),
			}),
		);
	}
}

export default DeleteAccountDto;
export type { DeleteAccount };
