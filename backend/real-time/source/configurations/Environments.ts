import { z } from "zod";

const environmentVariables = z.object({
	IS_DEVELOPMENT: z
		.string()
		.transform((value) => Boolean(value))
		.pipe(z.boolean())
		.or(z.undefined()),
	SERVICE_PORT: z
		.string()
		.transform((value) => Number(value))
		.pipe(z.number()),
	JWT_SECRET_KEY: z.string(),
	JWT_ISSUER: z.string(),
	AUTHORIZATION_CONNECTION: z.string(),
	KAFKA_GROUP_ID: z.string(),
	KAFKA_CLIENT_ID: z.string(),
	KAFKA_BROKERS: z
		.string()
		.transform((value) => value.split(",").map((v) => v.trim()))
		.pipe(z.array(z.string())),
});

export default environmentVariables.parse(process.env);
