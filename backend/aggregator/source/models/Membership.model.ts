import { Schema, model, Document } from "mongoose";

interface MembershipDocument extends Document {
	type: "room-members" | "room-messages";
	resource: string;
	members: string[];
}

const MembershipTypes: [string, ...string[]] = [
	"room-members",
	"room-messages",
];

const MembershipSchema = new Schema<MembershipDocument>(
	{
		type: {
			type: String,
			enum: MembershipTypes,
			required: [true, "{PATH} not found"],
		},
		resource: { type: String, required: [true, "{PATH} not found"] },
		members: {
			type: [String],
			required: [true, "{PATH} not found"],
			default: [],
		},
	},
	{ versionKey: false },
);

MembershipSchema.index({ type: 1, resource: 1 }, { unique: true });

const MembershipModel = model<MembershipDocument>(
	"membership",
	MembershipSchema,
);

export default MembershipModel;
export { MembershipTypes };
export type { MembershipDocument };
