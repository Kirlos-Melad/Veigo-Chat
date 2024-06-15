import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLList,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { Metadata, ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/types/GQLField";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import { GQLContext } from "../../GQLHandler";
import { MemberRoomList } from "@root/source/types/generated/protos/chat/MemberRoomPackage/MemberRoomList";
import MemberRoomGQLType from "../../types/MemberRoom.gql.type";

const Args: GraphQLFieldConfigArgumentMap = {
	roomId: { type: new GraphQLNonNull(GraphQLString) },
	membersId: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
};

type Args = typeof Args;

class MemberRoomAddGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "mutation",
			name: "AddMembersToRoom",
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
						.Get("MemberRoom")
						.Add(
							args,
							this.mIsGuarded
								? context.metadata!
								: new Metadata(),
							(
								error: ServiceError | null,
								response: MemberRoomList | undefined,
							) => (error ? reject(error) : resolve(response!)),
						),
				);

				return result;
			} catch (error) {
				throw error;
			}
		};
}

export default new MemberRoomAddGQLField();
