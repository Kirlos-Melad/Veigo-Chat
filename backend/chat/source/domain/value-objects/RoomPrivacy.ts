import { z } from "zod";

const RoomPrivacyOptionSchema = z.enum(["public", "private"]);
type RoomPrivacyOption = z.infer<typeof RoomPrivacyOptionSchema>;

class RoomPrivacy {
	private mValue: RoomPrivacyOption;

	private constructor(value: RoomPrivacyOption) {
		this.mValue = value;
	}

	public static get schema() {
		return RoomPrivacyOptionSchema;
	}

	public get value(): RoomPrivacyOption {
		return this.mValue;
	}

	public static CreateRoomPrivacy(privacy: string): RoomPrivacy {
		const parsedPrivacy = RoomPrivacyOptionSchema.parse(privacy);

		return new RoomPrivacy(parsedPrivacy);
	}
}

export default RoomPrivacy;
export type { RoomPrivacyOption };
