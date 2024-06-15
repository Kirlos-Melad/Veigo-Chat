import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { Metadata, ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/types/GQLField";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import LoginResponseGQLType from "../../types/LoginResponse.gql.type";
import { AuthenticationResponse } from "@root/source/types/generated/protos/authentication/AuthenticationPackage/AuthenticationResponse";
import { GQLContext } from "../../GQLHandler";

const Args: GraphQLFieldConfigArgumentMap = {
	email: { type: new GraphQLNonNull(GraphQLString) },
	password: { type: new GraphQLNonNull(GraphQLString) },
	clientId: { type: new GraphQLNonNull(GraphQLString) },
};

type Args = typeof Args;

class SignUpGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "mutation",
			name: "SignIn",
			args: Args,
			outputType: LoginResponseGQLType,
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
						.SignIn(
							args,
							this.mIsGuarded
								? context.metadata!
								: new Metadata(),
							(
								error: ServiceError | null,
								response: AuthenticationResponse | undefined,
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
