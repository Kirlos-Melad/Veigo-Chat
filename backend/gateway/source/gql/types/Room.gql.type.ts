import { GraphQLEnumType, GraphQLObjectType, GraphQLString } from "graphql";

const RoomPrivacyGQLType = new GraphQLEnumType({
	name: "privacy",
	values: {
		private: {},
		public: {},
	},
});

const RoomTypeGQLType = new GraphQLEnumType({
	name: "type",
	values: {
		direct: {},
		group: {},
	},
});

const RoomGQLType = new GraphQLObjectType({
	name: "Room",
	fields: {
		id: { type: GraphQLString },
		photoPath: { type: GraphQLString },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		type: { type: RoomTypeGQLType },
		privacy: { type: RoomPrivacyGQLType },
		createdAt: { type: GraphQLString },
		updatedAt: { type: GraphQLString },
	},
});

export default RoomGQLType;
export { RoomPrivacyGQLType, RoomTypeGQLType };