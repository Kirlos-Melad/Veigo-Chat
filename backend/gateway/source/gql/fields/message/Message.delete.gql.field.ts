import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { Metadata, ServiceError } from "@grpc/grpc-js";

import GQLField from "@root/source/gql/fields/GQLField";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import MessageGQLType from "../../types/Message.gql.type";
import { GQLContext } from "../../GQLHandler";
import { MessageObject } from "@root/source/types/generated/protos/chat/ChatObjectsPackage/MessageObject";

const Args: GraphQLFieldConfigArgumentMap = {
	roomId: { type: new GraphQLNonNull(GraphQLString) },
	messageId: { type: new GraphQLNonNull(GraphQLString) },
};

type Args = typeof Args;

class MessageDeleteGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "mutation",
			name: "DeleteMessage",
			args: Args,
			outputType: MessageGQLType,
			isGuarded: true,
		});
	}

	protected mResolver: GraphQLFieldResolver<any, GQLContext, Args, unknown> =
		async (source: any, args: Args, context: GQLContext) => {
			try {
				const result = await new Promise((resolve, reject) =>
					GRPCServiceManagerRegistry.instance
						.Get("Chat")
						.Get("Message")
						.Delete(
							args,
							this.mIsGuarded
								? context.metadata!
								: new Metadata(),
							(
								error: ServiceError | null,
								response: MessageObject | undefined,
							) => (error ? reject(error) : resolve(response!)),
						),
				);

				return result;
			} catch (error) {
				throw error;
			}
		};
}

export default new MessageDeleteGQLField();
