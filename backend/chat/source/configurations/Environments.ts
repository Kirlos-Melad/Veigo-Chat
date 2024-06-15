import { z } from "zod";

const environmentVariables = z.object({
	IS_DEVELOPMENT: z
		.string()
		.transform((value) => Boolean(value))
		.pipe(z.boolean())
		.or(z.undefined()),
	SERVICE_ADDRESS: z.string(),
	JWT_SECRET_KEY: z.string(),
	JWT_ISSUER: z.string(),
	AUTHORIZATION_CONNECTION: z.string(),
	DATABASE_CONNECTION: z.string(),
});

export default environmentVariables.parse(process.env);
