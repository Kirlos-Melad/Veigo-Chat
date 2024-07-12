import { z, ZodType } from "zod";
import { ServerErrorResponse } from "@grpc/grpc-js";
import { ServerStatusResponse } from "@grpc/grpc-js/build/src/server-call";

import { Dto } from "@source/application/dtos/Dto";
import {
	AuthorizationFunction,
	HandlerFunction,
	SerializerFunction,
} from "@source/application/utilities/TransactionalCall";

function Authorization(
	overrides: {
		returns?: string | boolean;
	} = {},
): AuthorizationFunction<any> {
	const { returns } = overrides;

	return async () => (returns === undefined ? true : returns);
}

class MockDto extends Dto<any> {}

function Serializer(
	overrides: {
		schema?: ZodType<any>;
	} = {},
): SerializerFunction<any, any> {
	const { schema } = overrides;

	return (data: any) => new MockDto(data, schema || z.any());
}

function Handler(overrides: { returns?: any } = {}): HandlerFunction<any, any> {
	const { returns } = overrides;

	return async () => returns || "data";
}

function Respond(
	_error: ServerErrorResponse | ServerStatusResponse | null,
	_result?: ResponseType | null,
): void {}

export const GRPCFactory = {
	Authorization,
	Serializer,
	Handler,
	Respond,
};
