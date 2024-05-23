import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/types/GQLField";
import { ReadRequest } from "@source/types/generated/protos/chat/RoomPackage/ReadRequest";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import { RoomObject } from "@source/types/generated/protos/chat/RoomPackage/RoomObject";
import RoomGQLType from "../../types/Room.gql.type";

const Args: GraphQLFieldConfigArgumentMap = {
	id: { type: new GraphQLNonNull(GraphQLString) },
};

type Args = typeof Args;

class RoomReadGQLField extends GQLField<Args> {
	constructor() {
		super("ReadRoom", RoomGQLType, Args);
	}

	protected mResolver: GraphQLFieldResolver<any, Args, any, unknown> =
		async function (source: any, args: Args) {
			try {
				const result = await new Promise<ReadRequest>(
					(resolve, reject) =>
						GRPCServiceManagerRegistry.instance
							.Get("Chat")
							.Get("Room")
							.Read(
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

export default new RoomReadGQLField();
