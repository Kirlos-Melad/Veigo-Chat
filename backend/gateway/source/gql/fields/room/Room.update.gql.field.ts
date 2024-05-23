import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/types/GQLField";
import { UpdateRequest } from "@source/types/generated/protos/chat/RoomPackage/UpdateRequest";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import { RoomObject } from "@source/types/generated/protos/chat/RoomPackage/RoomObject";
import RoomGQLType, { RoomPrivacyGQLType } from "../../types/Room.gql.type";

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
		super("UpdateRoom", RoomGQLType, Args);
	}

	protected mResolver: GraphQLFieldResolver<any, Args, any, unknown> =
		async function (source: any, args: Args) {
			try {
				const result = await new Promise<UpdateRequest>(
					(resolve, reject) =>
						GRPCServiceManagerRegistry.instance
							.Get("Chat")
							.Get("Room")
							.Update(
								args,
								(
									error: ServiceError | null,
									response: RoomObject | undefined,
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

export default new RoomUpdateGQLField();
