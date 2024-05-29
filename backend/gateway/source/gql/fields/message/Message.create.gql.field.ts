import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/types/GQLField";
import { CreateRequest } from "@source/types/generated/protos/chat/MessagePackage/CreateRequest";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import { MessageObject } from "@source/types/generated/protos/chat/MessagePackage/MessageObject";
import MessageGQLType from "../../types/Message.gql.type";
import { GQLContext } from "../../GQLHandler";

const Args: GraphQLFieldConfigArgumentMap = {
	roomId: { type: new GraphQLNonNull(GraphQLString) },
	senderId: { type: new GraphQLNonNull(GraphQLString) },
	content: { type: new GraphQLNonNull(GraphQLString) },
};

type Args = typeof Args;

class MessageCreateGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "mutation",
			name: "CreateMessage",
			args: Args,
			outputType: MessageGQLType,
			isGuarded: true,
		});
	}

	protected mResolver: GraphQLFieldResolver<any, GQLContext, Args, unknown> =
		async function (source: any, args: Args) {
			try {
				const result = await new Promise<CreateRequest>(
					(resolve, reject) =>
						GRPCServiceManagerRegistry.instance
							.Get("Chat")
							.Get("Message")
							.Create(
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

export default new MessageCreateGQLField();
