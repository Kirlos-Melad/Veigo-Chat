import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { Metadata, ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/types/GQLField";
import { ReadRequest } from "@source/types/generated/protos/chat/ProfilePackage/ReadRequest";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import { ProfileObject } from "@source/types/generated/protos/chat/ProfilePackage/ProfileObject";
import ProfileGQLType from "../../types/Profile.gql.type";
import { GQLContext } from "../../GQLHandler";

const Args: GraphQLFieldConfigArgumentMap = {
	id: { type: new GraphQLNonNull(GraphQLString) },
};

type Args = typeof Args;

class ProfileReadGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "query",
			name: "ReadProfile",
			args: Args,
			outputType: ProfileGQLType,
			isGuarded: true,
		});
	}

	protected mResolver: GraphQLFieldResolver<any, GQLContext, Args, unknown> =
		async (source: any, args: Args, context: GQLContext) => {
			try {
				const result = await new Promise<ReadRequest>(
					(resolve, reject) =>
						GRPCServiceManagerRegistry.instance
							.Get("Chat")
							.Get("Profile")
							.Read(
								args,
								this.mIsGuarded
									? context.metadata!
									: new Metadata(),
								(
									error: ServiceError | null,
									response: ProfileObject | undefined,
								) =>
									error ? reject(error) : resolve(response!),
							),
				);

				return result;
			} catch (error) {
				throw error;
			}
		};
}

export default new ProfileReadGQLField();
