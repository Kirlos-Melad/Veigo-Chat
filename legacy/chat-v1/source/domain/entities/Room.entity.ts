import RoomPrivacy, {
	RoomPrivacyOption,
} from "@source/domain/value-objects/RoomPrivacy";
import RoomType, {
	RoomTypeOption,
} from "@source/domain/value-objects/RoomType";

interface RoomEntity {
	id: string;

	photoPath: string;
	name: string;
	description: string;

	type: RoomTypeOption;
	privacy: RoomPrivacyOption;

	createdAt: string;
	updatedAt: string;
}

function IsRoomEntity(data: any): data is RoomEntity {
	return (
		data &&
		typeof data === "object" &&
		!Array.isArray(data) &&
		typeof data.id === "string" &&
		typeof data.photoPath === "string" &&
		typeof data.name === "string" &&
		typeof data.description === "string" &&
		RoomType.schema.safeParse(data.type).success &&
		RoomPrivacy.schema.safeParse(data.privacy).success &&
		typeof data.createdAt === "string" &&
		typeof data.updatedAt === "string"
	);
}

export default RoomEntity;
export { IsRoomEntity };
