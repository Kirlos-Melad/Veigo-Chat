import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { Metadata, ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/gql/fields/GQLField";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import { GQLContext } from "../../GQLHandler";
import { PaginationRequest } from "@source/types/generated/protos/common_objects/PaginationRequest";
import RoomGQLType from "../../types/Room.gql.type";
import PaginationResponseMetadataGQLType from "../../types/PaginationResponseMetadata.gql.type";

const Args: GraphQLFieldConfigArgumentMap = {
	id: { type: new GraphQLNonNull(GraphQLString) },
};

type Args = typeof Args;

class RoomListGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "query",
			name: "ListRooms",
			args: Args,
			outputType: new GraphQLObjectType({
				name: "ListRoomsOutput",
				fields: {
					records: { type: RoomGQLType },
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
					.Get("Room")
					.Read(
						args,
						this.mIsGuarded ? context.metadata! : new Metadata(),
						(
							error: ServiceError | null,
							response: PaginationRequest | undefined,
						) => (error ? reject(error) : resolve(response!)),
					),
			);
}

export default new RoomListGQLField();
