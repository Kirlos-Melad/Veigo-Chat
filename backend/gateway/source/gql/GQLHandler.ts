import {
	GraphQLFieldConfig,
	GraphQLObjectType,
	GraphQLSchema,
	ThunkObjMap,
} from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import path from "path";

import DependencyLoader from "../utilities/DependencyLoader";
import GQLField from "../types/GQLField";
import Logger from "../utilities/Logger";
import AbsolutePath from "../utilities/AbsolutePath";

const queryFields: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {};
const mutationFields: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {};

const loadedFields = await DependencyLoader(
	path.join(AbsolutePath(import.meta.url), "fields"),
	true,
);
for (const { default: field } of loadedFields) {
	if (field instanceof GQLField) {
		Logger.information(`Loaded event ${field.name}`);
		if (field.type === "query")
			queryFields[field.name] = field.ToFieldConfig();
		else if (field.type === "mutation")
			mutationFields[field.name] = field.ToFieldConfig();
	} else {
		Logger.warning(`An event is missing`);
	}
}

type GQLContext = { authorizationHeader?: string; token?: string };

const GQLHandler = createHandler({
	context(request, params) {
		return {
			authorizationHeader: request.raw.headers["authorization"],
		} as GQLContext;
	},
	schema: new GraphQLSchema({
		query: new GraphQLObjectType({
			name: "RootQuery",
			fields: queryFields,
		}),
		mutation: new GraphQLObjectType({
			name: "RootMutation",
			fields: mutationFields,
		}),
	}),
});

export default GQLHandler;
export type { GQLContext };
