import { GraphQLObjectType, GraphQLString } from "graphql";

const MessageGQLType = new GraphQLObjectType({
	name: "Message",
	fields: {
		id: { type: GraphQLString },
		roomId: { type: GraphQLString },
		senderId: { type: GraphQLString },
		content: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
	},
});

export default MessageGQLType;
