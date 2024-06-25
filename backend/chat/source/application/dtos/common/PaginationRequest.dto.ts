import { z } from "zod";
import { Dto } from "../Dto";
import { PaginationRequest } from "@root/source/types/generated/protos/common_objects/PaginationRequest";

type PaginationRequestSerialized = PaginationRequest;

class PaginationDto extends Dto<PaginationRequestSerialized> {
	constructor(data: any) {
		super(
			data,
			z.object({
				cursor: z.string().optional(),
				size: z.number().optional().default(25),
			}),
		);
	}
}

export default PaginationDto;
export type { PaginationRequestSerialized };
