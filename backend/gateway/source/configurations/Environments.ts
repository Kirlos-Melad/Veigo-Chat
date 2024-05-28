import grpc from "@grpc/grpc-js";
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
	AUTH_SERVICE_CONNECTION: z.string(),
	AUTH_SERVICE_CREDENTIALS: z
		.optional(z.string())
		.nullable()
		.transform((value) => {
			if (!value) return grpc.credentials.createInsecure();
			return grpc.credentials.createSsl();
		}),
	CHAT_SERVICE_CONNECTION: z.string(),
	CHAT_SERVICE_CREDENTIALS: z
		.optional(z.string())
		.nullable()
		.transform((value) => {
			if (!value) return grpc.credentials.createInsecure();
			return grpc.credentials.createSsl();
		}),
	RT_SERVICE_CONNECTION: z.string(),
});

export default environmentVariables.parse(process.env);
