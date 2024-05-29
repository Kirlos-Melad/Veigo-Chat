import { GraphQLBoolean, GraphQLObjectType } from "graphql";

const SuccessGQLType = new GraphQLObjectType({
	name: "Success",
	fields: {
		success: { type: GraphQLBoolean },
	},
});

export default SuccessGQLType;
