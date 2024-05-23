import { GraphQLObjectType, GraphQLString } from "graphql";

const UserRoomGQLType = new GraphQLObjectType({
	name: "UserRoom",
	fields: {
		userId: { type: GraphQLString },
		roomId: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
	},
});

export default UserRoomGQLType;
