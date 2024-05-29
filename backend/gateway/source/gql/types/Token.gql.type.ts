import { GraphQLObjectType, GraphQLString } from "graphql";

const TokenGQLType = new GraphQLObjectType({
	name: "Token",
	fields: {
		access: { type: GraphQLString },
		refresh: { type: GraphQLString },
	},
});

export default TokenGQLType;
