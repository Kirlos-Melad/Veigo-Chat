import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { Metadata, ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/types/GQLField";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import SuccessGQLType from "../../types/Success.gql.type";
import { GQLContext } from "../../GQLHandler";
import { EmptyObject } from "@root/source/types/generated/protos/authentication/AuthenticationPackage/EmptyObject";

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
		async (source: any, args: Args, context: GQLContext) => {
			try {
				const result = await new Promise((resolve, reject) =>
					GRPCServiceManagerRegistry.instance
						.Get("Auth")
						.Get("Authentication")
						.ValidateAccessToken(
							args,
							this.mIsGuarded
								? context.metadata!
								: new Metadata(),
							(
								error: ServiceError | null,
								_: EmptyObject | undefined,
							) =>
								error
									? reject(error)
									: resolve({ success: true }),
						),
				);

				return result;
			} catch (error) {
				throw error;
			}
		};
}

export default new ValidateAccessTokenGQLField();
