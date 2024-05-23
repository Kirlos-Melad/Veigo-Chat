import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/types/GQLField";
import { ReadRequest } from "@source/types/generated/protos/chat/UserRoomPackage/ReadRequest";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import { UserRoomObject } from "@source/types/generated/protos/chat/UserRoomPackage/UserRoomObject";
import UserRoomGQLType from "../../types/UserRoom.gql.type";

const Args: GraphQLFieldConfigArgumentMap = {
	userId: { type: new GraphQLNonNull(GraphQLString) },
	roomId: { type: new GraphQLNonNull(GraphQLString) },
};

type Args = typeof Args;

class UserRoomReadGQLField extends GQLField<Args> {
	constructor() {
		super("ReadUserRoom", UserRoomGQLType, Args);
	}

	protected mResolver: GraphQLFieldResolver<any, Args, any, unknown> =
		async function (source: any, args: Args) {
			try {
				const result = await new Promise<ReadRequest>(
					(resolve, reject) =>
						GRPCServiceManagerRegistry.instance
							.Get("Chat")
							.Get("UserRoom")
							.Read(
								args,
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
