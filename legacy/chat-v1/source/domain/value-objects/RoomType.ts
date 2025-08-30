import { z } from "zod";

const RoomTypeOptionSchema = z.enum(["direct", "group"]);
type RoomTypeOption = z.infer<typeof RoomTypeOptionSchema>;

class RoomType {
	private mValue: RoomTypeOption;

	private constructor(value: RoomTypeOption) {
		this.mValue = value;
	}

	public static get schema() {
		return RoomTypeOptionSchema;
	};

	public get value(): RoomTypeOption {
		return this.mValue;
	}

	public static CreateRoomType(type: string): RoomType {
		const parsedType = RoomTypeOptionSchema.parse(type);

		return new RoomType(parsedType);
	}
}

export default RoomType;
export type { RoomTypeOption };
