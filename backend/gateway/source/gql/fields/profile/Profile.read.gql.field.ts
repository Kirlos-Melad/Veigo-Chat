import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/types/GQLField";
import { ReadRequest } from "@source/types/generated/protos/chat/ProfilePackage/ReadRequest";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import { ProfileObject } from "@source/types/generated/protos/chat/ProfilePackage/ProfileObject";
import ProfileGQLType from "../../types/Profile.gql.type";

const Args: GraphQLFieldConfigArgumentMap = {
	id: { type: new GraphQLNonNull(GraphQLString) },
};

type Args = typeof Args;

class ProfileReadGQLField extends GQLField<Args> {
	constructor() {
		super("ReadProfile", ProfileGQLType, Args);
	}

	protected mResolver: GraphQLFieldResolver<any, Args, any, unknown> =
		async function (source: any, args: Args) {
			try {
				const result = await new Promise<ReadRequest>(
					(resolve, reject) =>
						GRPCServiceManagerRegistry.instance
							.Get("Chat")
							.Get("Profile")
							.Read(
								args,
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
