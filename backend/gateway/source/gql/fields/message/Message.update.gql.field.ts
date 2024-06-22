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

	content: { type: GraphQLString },
};

type Args = typeof Args;

class MessageUpdateGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "mutation",
			name: "UpdateMessage",
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
					.Update(
						args,
						this.mIsGuarded ? context.metadata! : new Metadata(),
						(
							error: ServiceError | null,
							response: MessageObject | undefined,
						) => (error ? reject(error) : resolve(response!)),
					),
			);
}

export default new MessageUpdateGQLField();
