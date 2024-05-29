import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/types/GQLField";
import { DeleteRequest } from "@source/types/generated/protos/chat/RoomPackage/DeleteRequest";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import { RoomObject } from "@source/types/generated/protos/chat/RoomPackage/RoomObject";
import RoomGQLType from "../../types/Room.gql.type";
import { GQLContext } from "../../GQLHandler";

const Args: GraphQLFieldConfigArgumentMap = {
	id: { type: new GraphQLNonNull(GraphQLString) },
};

type Args = typeof Args;

class RoomDeleteGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "mutation",
			name: "DeleteRoom",
			args: Args,
			outputType: RoomGQLType,
			isGuarded: true,
		});
	}

	protected mResolver: GraphQLFieldResolver<any, GQLContext, Args, unknown> =
		async function (source: any, args: Args) {
			try {
				const result = await new Promise<DeleteRequest>(
					(resolve, reject) =>
						GRPCServiceManagerRegistry.instance
							.Get("Chat")
							.Get("Room")
							.Delete(
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

export default new RoomDeleteGQLField();
