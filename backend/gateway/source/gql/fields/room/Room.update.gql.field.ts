import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { Metadata, ServiceError } from "@grpc/grpc-js";

import GQLField from "@root/source/gql/fields/GQLField";
import { UpdateRequest } from "@source/types/generated/protos/chat/RoomPackage/UpdateRequest";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import RoomGQLType, { RoomPrivacyGQLType } from "../../types/Room.gql.type";
import { GQLContext } from "../../GQLHandler";
import { RoomObject } from "@root/source/types/generated/protos/chat/ChatObjectsPackage/RoomObject";

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
		async (source: any, args: Args, context: GQLContext) => {
			try {
				const result = await new Promise((resolve, reject) =>
					GRPCServiceManagerRegistry.instance
						.Get("Chat")
						.Get("Room")
						.Update(
							args,
							this.mIsGuarded
								? context.metadata!
								: new Metadata(),
							(
								error: ServiceError | null,
								response: RoomObject | undefined,
							) => (error ? reject(error) : resolve(response!)),
						),
				);

				return result;
			} catch (error) {
				throw error;
			}
		};
}

export default new RoomUpdateGQLField();
