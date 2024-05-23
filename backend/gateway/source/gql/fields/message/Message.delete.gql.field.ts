import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/types/GQLField";
import { DeleteRequest } from "@source/types/generated/protos/chat/MessagePackage/DeleteRequest";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import { MessageObject } from "@source/types/generated/protos/chat/MessagePackage/MessageObject";
import MessageGQLType from "../../types/Message.gql.type";

const Args: GraphQLFieldConfigArgumentMap = {
	id: { type: new GraphQLNonNull(GraphQLString) },
};

type Args = typeof Args;

class MessageDeleteGQLField extends GQLField<Args> {
	constructor() {
		super("DeleteMessage", MessageGQLType, Args);
	}

	protected mResolver: GraphQLFieldResolver<any, Args, any, unknown> =
		async function (source: any, args: Args) {
			try {
				const result = await new Promise<DeleteRequest>(
					(resolve, reject) =>
						GRPCServiceManagerRegistry.instance
							.Get("Chat")
							.Get("Message")
							.Delete(
								args,
								(
									error: ServiceError | null,
									response: MessageObject | undefined,
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

export default new MessageDeleteGQLField();
