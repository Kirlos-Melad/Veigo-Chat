import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/types/GQLField";
import { CreateRequest } from "@source/types/generated/protos/chat/RoomPackage/CreateRequest";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import { RoomObject } from "@source/types/generated/protos/chat/RoomPackage/RoomObject";
import RoomGQLType, {
	RoomPrivacyGQLType,
	RoomTypeGQLType,
} from "../../types/Room.gql.type";

const Args: GraphQLFieldConfigArgumentMap = {
	photoPath: { type: GraphQLString },
	name: { type: new GraphQLNonNull(GraphQLString) },
	description: { type: GraphQLString },
	type: { type: new GraphQLNonNull(RoomTypeGQLType) },
	privacy: { type: RoomPrivacyGQLType },
};

type Args = typeof Args;

class RoomCreateGQLField extends GQLField<Args> {
	constructor() {
		super("CreateRoom", RoomGQLType, Args);
	}

	protected mResolver: GraphQLFieldResolver<any, Args, any, unknown> =
		async function (source: any, args: Args) {
			try {
				const result = await new Promise<CreateRequest>(
					(resolve, reject) =>
						GRPCServiceManagerRegistry.instance
							.Get("Chat")
							.Get("Room")
							.Create(
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

export default new RoomCreateGQLField();
