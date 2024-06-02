import { Schema, model, Document } from "mongoose";

interface OwnershipDocument extends Document {
	type: "message";
	resource: string;
	owner: string;
}

const OwnershipTypes: [string, ...string[]] = ["message"];

const OwnershipSchema = new Schema<OwnershipDocument>(
	{
		type: {
			type: String,
			enum: OwnershipTypes,
			required: [true, "{PATH} not found"],
		},
		resource: { type: String, required: [true, "{PATH} not found"] },
		owner: { type: String, required: [true, "{PATH} not found"] },
	},
	{ _id: false, versionKey: false },
);

OwnershipSchema.index({ type: 1, resource: 1 }, { unique: true });

const OwnershipModel = model<OwnershipDocument>("ownership", OwnershipSchema);

export default OwnershipModel;
export { OwnershipTypes };
export type { OwnershipDocument };
