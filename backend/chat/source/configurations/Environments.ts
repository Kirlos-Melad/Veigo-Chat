import { z } from "zod";

const environmentVariables = z.object({
	IS_DEVELOPMENT: z
		.string()
		.transform((value) => Boolean(value))
		.pipe(z.boolean())
		.or(z.undefined()),
	SERVICE_ADDRESS: z.string(),
	DATABASE_CONNECTION: z.string(),
	KAFKA_CLIENT_ID: z.string(),
	KAFKA_BROKERS: z
		.string()
		.transform((value) => value.split(",").map((v) => v.trim()))
		.pipe(z.array(z.string())),
	JWT_SECRET_KEY: z.string(),
	JWT_ISSUER: z.string(),
});

export default environmentVariables.parse(process.env);
