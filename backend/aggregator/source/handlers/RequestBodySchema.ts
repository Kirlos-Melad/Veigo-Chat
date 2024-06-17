import { z } from "zod";
import { OwnershipTypes } from "../models/Ownership.model";
import { MembershipTypes } from "../models/Membership.model";
import { ConfigurationsTypes } from "../models/Configuration.model";

// Define specific schemas for each type of query
const OwnerSchema = z.object({
	type: z.enum(OwnershipTypes),
	resource: z.string(),
	user: z.string(),
});

const MemberSchema = z.object({
	type: z.enum(MembershipTypes),
	resource: z.string(),
	user: z.string(),
});

const ConfigurationSchema = z.object({
	type: z.enum(ConfigurationsTypes),
	resource: z.string(),
	paths: z.array(z.string()),
	values: z.array(z.any()),
});

// Define the main schema for the request body
const RequestBodySchema = z.object({
	ownership: OwnerSchema.optional(),
	membership: MemberSchema.optional(),
	configuration: ConfigurationSchema.optional(),
});

export default RequestBodySchema;
export { OwnerSchema, MemberSchema, ConfigurationSchema };
