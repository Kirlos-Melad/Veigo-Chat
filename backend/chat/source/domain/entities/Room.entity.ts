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

	createdAt: Date;
	updatedAt: Date;
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
		data.createdAt instanceof Date &&
		data.updatedAt instanceof Date
	);
}

export default RoomEntity;
export { IsRoomEntity };
