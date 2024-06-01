import { z } from "zod";

// Define specific schemas for each type of query
const OwnerSchema = z.object({
	type: z.string(),
	resource: z.string(),
	user: z.string(),
});

const MemberSchema = z.object({
	type: z.string(),
	resource: z.string(),
	user: z.string(),
});

const ConfigurationSchema = z.object({
	type: z.string(),
	resource: z.string(),
	path: z.string(),
	value: z.any(),
});

// Define the main schema for the request body
const RequestBodySchema = z.object({
	ownership: OwnerSchema.optional(),
	membership: MemberSchema.optional(),
	configuration: ConfigurationSchema.optional(),
});

export default RequestBodySchema;
export { OwnerSchema, MemberSchema, ConfigurationSchema };