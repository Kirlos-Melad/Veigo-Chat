import { Schema, model, Document } from "mongoose";

interface MembershipDocument extends Document {
	type: string;
	resource: string;
	members: string[];
}

const memberSchema = new Schema<MembershipDocument>(
	{
		type: { type: String, required: [true, "{PATH} not found"] },
		resource: { type: String, required: [true, "{PATH} not found"] },
		members: {
			type: [String],
			required: [true, "{PATH} not found"],
			default: [],
		},
	},
	{ _id: false, versionKey: false },
);

memberSchema.index({ type: 1, resource: 1 }, { unique: true });

const MembershipModel = model<MembershipDocument>("membership", memberSchema);

export default MembershipModel;
export type { MembershipDocument };
