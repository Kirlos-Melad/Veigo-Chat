import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { Metadata, ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/gql/fields/GQLField";
import { UpdateRequest } from "@source/types/generated/protos/room/UpdateRequest";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import RoomGQLType, { RoomPrivacyGQLType } from "../../types/Room.gql.type";
import { GQLContext } from "../../GQLHandler";
import { RoomObject } from "@source/types/generated/protos/chat_objects/RoomObject";

const Args: GraphQLFieldConfigArgumentMap = {
	id: { type: new GraphQLNonNull(GraphQLString) },
	photoPath: { type: GraphQLString },
	name: { type: GraphQLString },
	description: { type: GraphQLString },
	privacy: { type: RoomPrivacyGQLType },
};

type Args = typeof Args;

class RoomUpdateGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "mutation",
			name: "UpdateRoom",
			args: Args,
			outputType: RoomGQLType,
			isGuarded: true,
		});
	}

	protected mResolver: GraphQLFieldResolver<any, GQLContext, Args, unknown> =
		async (source: any, args: Args, context: GQLContext) =>
			await new Promise((resolve, reject) =>
				GRPCServiceManagerRegistry.instance
					.Get("Chat")
					.Get("Room")
					.Update(
						args,
						this.mIsGuarded ? context.metadata! : new Metadata(),
						(
							error: ServiceError | null,
							response: RoomObject | undefined,
						) => (error ? reject(error) : resolve(response!)),
					),
			);
}

export default new RoomUpdateGQLField();
