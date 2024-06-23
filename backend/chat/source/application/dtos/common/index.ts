import PaginationDto, {
	PaginationRequestSerialized,
} from "./PaginationRequest.dto";

class CommonDto {
	public static Pagination(data: any) {
		return new PaginationDto(data);
	}
}

export default CommonDto;
export type { PaginationRequestSerialized };
