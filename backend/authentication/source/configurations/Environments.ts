import { z } from "zod";

const durationUnitSchema = z.enum([
	"milliseconds",
	"seconds",
	"minutes",
	"hours",
	"days",
	"weeks",
	"months",
	"years",
]);

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
	JWT_CONFIGURATION: z
		.string()
		.transform((value) => JSON.parse(value))
		.pipe(
			z.object({
				secret: z.string(),
				algorithm: z.string(),
				encryption: z.string(),
				issuer: z.string(),
				duration: z.object({
					amount: z.number(),
					unit: durationUnitSchema,
				}),
			}),
		),
	NODE_MAILER_AUTH: z
		.string()
		.transform((value) => JSON.parse(value))
		.pipe(
			z.object({
				hostName: z.string(),
				hostAddress: z.string(),
				hostPort: z.number(),
				secure: z.boolean(),
				userName: z.string(),
				userAddress: z.string(),
				userPassword: z.string(),
			}),
		)
		.or(z.undefined()),
});

export default environmentVariables.parse(process.env);
