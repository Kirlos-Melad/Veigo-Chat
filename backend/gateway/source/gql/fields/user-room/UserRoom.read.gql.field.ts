import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { Metadata, ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/types/GQLField";
import { ReadRequest } from "@source/types/generated/protos/chat/UserRoomPackage/ReadRequest";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import { UserRoomObject } from "@source/types/generated/protos/chat/UserRoomPackage/UserRoomObject";
import UserRoomGQLType from "../../types/UserRoom.gql.type";
import { GQLContext } from "../../GQLHandler";

const Args: GraphQLFieldConfigArgumentMap = {
	userId: { type: new GraphQLNonNull(GraphQLString) },
	roomId: { type: new GraphQLNonNull(GraphQLString) },
};

type Args = typeof Args;

class UserRoomReadGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "query",
			name: "ReadUserRoom",
			args: Args,
			outputType: UserRoomGQLType,
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
							.Get("UserRoom")
							.Read(
								args,
								this.mIsGuarded
									? context.metadata!
									: new Metadata(),
								(
									error: ServiceError | null,
									response: UserRoomObject | undefined,
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

export default new UserRoomReadGQLField();
