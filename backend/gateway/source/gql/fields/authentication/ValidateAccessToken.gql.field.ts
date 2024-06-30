import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { Metadata, ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/gql/fields/GQLField";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import SuccessGQLType from "../../types/Success.gql.type";
import { GQLContext } from "../../GQLHandler";

const Args: GraphQLFieldConfigArgumentMap = {
	token: { type: new GraphQLNonNull(GraphQLString) },
};

type Args = typeof Args;

class ValidateAccessTokenGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "mutation",
			name: "ValidateAccessToken",
			args: Args,
			outputType: SuccessGQLType,
			isGuarded: false,
		});
	}

	protected mResolver: GraphQLFieldResolver<any, GQLContext, Args, unknown> =
		async (source: any, args: Args, context: GQLContext) =>
			await new Promise((resolve, reject) =>
				GRPCServiceManagerRegistry.instance
					.Get("Auth")
					.Get("Authentication")
					.ValidateAccessToken(
						args,
						this.mIsGuarded ? context.metadata! : new Metadata(),
						(error: ServiceError | null) =>
							error ? reject(error) : resolve({ success: true }),
					),
			);
}

export default new ValidateAccessTokenGQLField();
