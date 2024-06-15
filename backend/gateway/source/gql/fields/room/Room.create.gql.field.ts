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
import RoomGQLType, {
	RoomPrivacyGQLType,
	RoomTypeGQLType,
} from "../../types/Room.gql.type";
import { GQLContext } from "../../GQLHandler";
import { RoomInformation } from "@root/source/types/generated/protos/chat/RoomPackage/RoomInformation";

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
						.Create(
							args,
							this.mIsGuarded
								? context.metadata!
								: new Metadata(),
							(
								error: ServiceError | null,
								response: RoomInformation | undefined,
							) => (error ? reject(error) : resolve(response!)),
						),
				);

				return result;
			} catch (error) {
				throw error;
			}
		};
}

export default new RoomCreateGQLField();
