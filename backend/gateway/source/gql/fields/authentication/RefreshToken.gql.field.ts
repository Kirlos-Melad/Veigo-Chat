import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { Metadata, ServiceError } from "@grpc/grpc-js";

import GQLField from "@root/source/gql/fields/GQLField";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import { GQLContext } from "../../GQLHandler";
import TokenGQLType from "../../types/Token.gql.type";
import { TokenObject } from "@root/source/types/generated/protos/authentication/AuthenticationPackage/TokenObject";

const Args: GraphQLFieldConfigArgumentMap = {
	token: { type: new GraphQLNonNull(GraphQLString) },
};

type Args = typeof Args;

class SignUpGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "mutation",
			name: "RefreshToken",
			args: Args,
			outputType: TokenGQLType,
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
						.RefreshToken(
							args,
							this.mIsGuarded
								? context.metadata!
								: new Metadata(),
							(
								error: ServiceError | null,
								response: TokenObject | undefined,
							) => (error ? reject(error) : resolve(response!)),
						),
				);

				return result;
			} catch (error) {
				throw error;
			}
		};
}

export default new SignUpGQLField();
