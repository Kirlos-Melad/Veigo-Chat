import { GraphQLObjectType, GraphQLString } from "graphql";

const MemberRoomGQLType = new GraphQLObjectType({
	name: "MemberRoom",
	fields: {
		memberId: { type: GraphQLString },
		roomId: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
	},
});

export default MemberRoomGQLType;
