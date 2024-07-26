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
    SECRET_KEY: z.string(),
    SERVICE_ADDRESS: z.string(),
    DATABASE_CONNECTION: z.string(),
    JWT_CONFIGURATION: z
        .string()
        .transform((value: string): unknown => JSON.parse(value))
        .pipe(
            z.object({
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
        .transform((value: string): unknown => JSON.parse(value))
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

export const environments = environmentVariables.parse(process.env);
