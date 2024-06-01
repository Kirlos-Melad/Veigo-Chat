import { Schema, model, Document } from "mongoose";

interface OwnershipDocument extends Document {
	type: string;
	resource: string;
	owner: string;
}

const ownershipSchema = new Schema<OwnershipDocument>(
	{
		type: { type: String, required: [true, "{PATH} not found"] },
		resource: { type: String, required: [true, "{PATH} not found"] },
		owner: { type: String, required: [true, "{PATH} not found"] },
	},
	{ _id: false, versionKey: false },
);

ownershipSchema.index({ type: 1, resource: 1 }, { unique: true });

const OwnershipModel = model<OwnershipDocument>("ownership", ownershipSchema);

export default OwnershipModel;
export type { OwnershipDocument };
