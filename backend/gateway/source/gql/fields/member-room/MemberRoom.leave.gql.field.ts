import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { Metadata, ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/types/GQLField";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import MemberRoomGQLType from "../../types/MemberRoom.gql.type";
import { GQLContext } from "../../GQLHandler";
import { MemberRoomObject } from "@root/source/types/generated/protos/chat/ChatObjectsPackage/MemberRoomObject";

const Args: GraphQLFieldConfigArgumentMap = {
	roomId: { type: new GraphQLNonNull(GraphQLString) },
};

type Args = typeof Args;

class UserRoomDeleteGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "mutation",
			name: "DeleteUserRoom",
			args: Args,
			outputType: MemberRoomGQLType,
			isGuarded: true,
		});
	}

	protected mResolver: GraphQLFieldResolver<any, GQLContext, Args, unknown> =
		async (source: any, args: Args, context: GQLContext) => {
			try {
				const result = await new Promise((resolve, reject) =>
					GRPCServiceManagerRegistry.instance
						.Get("Chat")
						.Get("UserRoom")
						.Delete(
							args,
							this.mIsGuarded
								? context.metadata!
								: new Metadata(),
							(
								error: ServiceError | null,
								response: MemberRoomObject | undefined,
							) => (error ? reject(error) : resolve(response!)),
						),
				);

				return result;
			} catch (error) {
				throw error;
			}
		};
}

export default new UserRoomDeleteGQLField();
