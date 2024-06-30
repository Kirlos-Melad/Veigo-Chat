import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { Metadata, ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/gql/fields/GQLField";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import { GQLContext } from "../../GQLHandler";
import MemberRoomGQLType from "../../types/MemberRoom.gql.type";
import PaginationRequestGQLType from "../../types/PaginationRequest.gql.type";
import { MemberRoomObjectPage } from "@source/types/generated/protos/chat_objects/MemberRoomObjectPage";
import PaginationResponseMetadataGQLType from "../../types/PaginationResponseMetadata.gql.type";

const Args: GraphQLFieldConfigArgumentMap = {
	roomId: { type: new GraphQLNonNull(GraphQLString) },
	page: { type: PaginationRequestGQLType },
};

type Args = typeof Args;

class MemberRoomListGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "query",
			name: "ListRoomMembers",
			args: Args,
			outputType: new GraphQLObjectType({
				name: "ListRoomMembersOutput",
				fields: {
					records: { type: new GraphQLList(MemberRoomGQLType) },
					metadata: { type: PaginationResponseMetadataGQLType },
				},
			}),
			isGuarded: true,
		});
	}

	protected mResolver: GraphQLFieldResolver<any, GQLContext, Args, unknown> =
		async (source: any, args: Args, context: GQLContext) =>
			await new Promise((resolve, reject) =>
				GRPCServiceManagerRegistry.instance
					.Get("Chat")
					.Get("MemberRoom")
					.Add(
						args,
						this.mIsGuarded ? context.metadata! : new Metadata(),
						(
							error: ServiceError | null,
							response: MemberRoomObjectPage | undefined,
						) => (error ? reject(error) : resolve(response!)),
					),
			);
}

export default new MemberRoomListGQLField();
