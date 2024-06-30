import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { Metadata, ServiceError } from "@grpc/grpc-js";

import GQLField from "@source/gql/fields/GQLField";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import { GQLContext } from "../../GQLHandler";
import { MessageObjectPage } from "@source/types/generated/protos/chat_objects/MessageObjectPage";
import MessageGQLType from "../../types/Message.gql.type";
import PaginationResponseMetadataGQLType from "../../types/PaginationResponseMetadata.gql.type";

const Args: GraphQLFieldConfigArgumentMap = {
	roomId: { type: new GraphQLNonNull(GraphQLString) },
};

type Args = typeof Args;

class MessageListGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "query",
			name: "ListMessages",
			args: Args,
			outputType: new GraphQLObjectType({
				name: "ListMessagesOutput",
				fields: {
					records: { type: new GraphQLList(MessageGQLType) },
					metadata: { type: PaginationResponseMetadataGQLType },
				},
			}),
			isGuarded: true,
		});
	}

	protected mResolver: GraphQLFieldResolver<any, GQLContext, Args, unknown> =
		async (source: any, args: Args, context: GQLContext) =>
			await new Promise((resolve, reject) =>
				GRPCServiceManagerRegistry.instance
					.Get("Chat")
					.Get("Message")
					.Read(
						args,
						this.mIsGuarded ? context.metadata! : new Metadata(),
						(
							error: ServiceError | null,
							response: MessageObjectPage | undefined,
						) => (error ? reject(error) : resolve(response!)),
					),
			);
}

export default new MessageListGQLField();
