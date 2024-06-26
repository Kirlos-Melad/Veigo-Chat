import { GraphQLInputObjectType, GraphQLInt, GraphQLString } from "graphql";

const PaginationRequestGQLType = new GraphQLInputObjectType({
	name: "PaginationRequest",
	fields: {
		cursor: { type: GraphQLString },
		size: { type: GraphQLInt },
	},
});

export default PaginationRequestGQLType;
