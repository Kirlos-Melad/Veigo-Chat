import { GraphQLList, GraphQLObjectType } from "graphql";
import MessageGQLType from "./Message.gql.type";

const MessageListGQLType = new GraphQLObjectType({
	name: "MessageList",
	fields: {
		messages: { type: new GraphQLList(MessageGQLType) },
	},
});

export default MessageListGQLType;
