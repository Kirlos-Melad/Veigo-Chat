import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { Metadata, ServiceError } from "@grpc/grpc-js";

import GQLField from "@root/source/gql/fields/GQLField";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import RoomGQLType, {
	RoomPrivacyGQLType,
	RoomTypeGQLType,
} from "../../types/Room.gql.type";
import { GQLContext } from "../../GQLHandler";
import { CreateRequest } from "@root/source/types/generated/protos/room/CreateRequest";
import MemberRoomGQLType from "../../types/MemberRoom.gql.type";

const Args: GraphQLFieldConfigArgumentMap = {
	photoPath: { type: GraphQLString },
	name: { type: new GraphQLNonNull(GraphQLString) },
	description: { type: GraphQLString },
	type: { type: new GraphQLNonNull(RoomTypeGQLType) },
	privacy: { type: RoomPrivacyGQLType },
	members: { type: new GraphQLList(GraphQLString) },
};

type Args = typeof Args;

class RoomCreateGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "mutation",
			name: "CreateRoom",
			args: Args,
			outputType: new GraphQLObjectType({
				name: "CreateRoomOutput",
				fields: {
					information: { type: RoomGQLType },
					members: { type: new GraphQLList(MemberRoomGQLType) },
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
					.Create(
						args,
						this.mIsGuarded ? context.metadata! : new Metadata(),
						(
							error: ServiceError | null,
							response: CreateRequest | undefined,
						) => (error ? reject(error) : resolve(response!)),
					),
			);
}

export default new RoomCreateGQLField();
