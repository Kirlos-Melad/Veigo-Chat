import { GraphQLObjectType, GraphQLString } from "graphql";

const ProfileGQLType = new GraphQLObjectType({
	name: "Profile",
	fields: {
		id: { type: GraphQLString },
		photoPath: { type: GraphQLString },
		name: { type: GraphQLString },
		about: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
	},
});

export default ProfileGQLType;
