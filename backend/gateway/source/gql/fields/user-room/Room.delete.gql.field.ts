import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/types/GQLField";
import { DeleteRequest } from "@source/types/generated/protos/chat/UserRoomPackage/DeleteRequest";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import { UserRoomObject } from "@source/types/generated/protos/chat/UserRoomPackage/UserRoomObject";
import UserRoomGQLType from "../../types/UserRoom.gql.type";

const Args: GraphQLFieldConfigArgumentMap = {
	userId: { type: new GraphQLNonNull(GraphQLString) },
	roomId: { type: new GraphQLNonNull(GraphQLString) },
};

type Args = typeof Args;

class UserRoomDeleteGQLField extends GQLField<Args> {
	constructor() {
		super("DeleteUserRoom", UserRoomGQLType, Args);
	}

	protected mResolver: GraphQLFieldResolver<any, Args, any, unknown> =
		async function (source: any, args: Args) {
			try {
				const result = await new Promise<DeleteRequest>(
					(resolve, reject) =>
						GRPCServiceManagerRegistry.instance
							.Get("Chat")
							.Get("UserRoom")
							.Delete(
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

export default new UserRoomDeleteGQLField();
