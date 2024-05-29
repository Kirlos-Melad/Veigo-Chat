import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/types/GQLField";
import { ReadRequest } from "@source/types/generated/protos/chat/MessagePackage/ReadRequest";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import { MessageObject } from "@source/types/generated/protos/chat/MessagePackage/MessageObject";
import MessageGQLType from "../../types/Message.gql.type";
import { GQLContext } from "../../GQLHandler";

const Args: GraphQLFieldConfigArgumentMap = {
	id: { type: new GraphQLNonNull(GraphQLString) },
};

type Args = typeof Args;

class MessageReadGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "query",
			name: "ReadMessage",
			args: Args,
			outputType: MessageGQLType,
			isGuarded: true,
		});
	}

	protected mResolver: GraphQLFieldResolver<any, GQLContext, Args, unknown> =
		async function (source: any, args: Args) {
			try {
				const result = await new Promise<ReadRequest>(
					(resolve, reject) =>
						GRPCServiceManagerRegistry.instance
							.Get("Chat")
							.Get("Message")
							.Read(
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

export default new MessageReadGQLField();
