import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { Metadata, ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/gql/fields/GQLField";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import MessageGQLType from "../../types/Message.gql.type";
import { GQLContext } from "../../GQLHandler";
import { MessageObject } from "@source/types/generated/protos/chat_objects/MessageObject";

const Args: GraphQLFieldConfigArgumentMap = {
	roomId: { type: new GraphQLNonNull(GraphQLString) },
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
		async (source: any, args: Args, context: GQLContext) =>
			await new Promise((resolve, reject) =>
				GRPCServiceManagerRegistry.instance
					.Get("Chat")
					.Get("Message")
					.Create(
						args,
						this.mIsGuarded ? context.metadata! : new Metadata(),
						(
							error: ServiceError | null,
							response: MessageObject | undefined,
						) => (error ? reject(error) : resolve(response!)),
					),
			);
}

export default new MessageCreateGQLField();
