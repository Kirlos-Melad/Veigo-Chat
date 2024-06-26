import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from "graphql";

const PaginationResponseMetadataGQLType = new GraphQLObjectType({
	name: "PaginationResponseMetadata",
	fields: {
		cursor: { type: GraphQLString },
		hasMore: { type: GraphQLBoolean },
	},
});

export default PaginationResponseMetadataGQLType;
