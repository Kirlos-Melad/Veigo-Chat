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

const fields: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {};

const loadedFields = await DependencyLoader(
	path.join(AbsolutePath(import.meta.url), "fields"),
	true,
);
for (const { default: field } of loadedFields) {
	if (field instanceof GQLField) {
		Logger.information(`Loaded event ${field.name}`);
		fields[field.name] = field.ToFieldConfig();
	} else {
		Logger.warning(`An event is missing`);
	}
}

const GQLHandler = createHandler({
	schema: new GraphQLSchema({
		query: new GraphQLObjectType({
			name: "RootQuery",
			fields: fields,
		}),
	}),
});

export default GQLHandler;
