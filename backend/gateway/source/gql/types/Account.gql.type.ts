import { GraphQLObjectType, GraphQLString } from "graphql";

const AccountGQLType = new GraphQLObjectType({
	name: "Account",
	fields: {
		id: { type: GraphQLString },
		
		email: { type: GraphQLString },
		isEmailVerified: { type: GraphQLString },

		phone: { type: GraphQLString },
		isPhoneVerified: { type: GraphQLString },

		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
	},
});

export default AccountGQLType;
