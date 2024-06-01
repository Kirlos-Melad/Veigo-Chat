import { Schema, model, Document } from "mongoose";

interface ConfigurationDocument extends Document {
	type: string;
	resource: string;
	settings: any;
}

const configurationSchema = new Schema<ConfigurationDocument>(
	{
		type: { type: String, required: [true, "{PATH} not found"] },
		resource: { type: String, required: [true, "{PATH} not found"] },
		settings: {
			type: Schema.Types.Mixed,
			required: [true, "{PATH} not found"],
		},
	},
	{ _id: false, versionKey: false },
);

configurationSchema.index({ type: 1, resource: 1 }, { unique: true });

const ConfigurationModel = model<ConfigurationDocument>(
	"configuration",
	configurationSchema,
);

export default ConfigurationModel;
export type { ConfigurationDocument };
