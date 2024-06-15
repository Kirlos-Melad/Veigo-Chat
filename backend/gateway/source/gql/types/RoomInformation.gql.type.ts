import { GraphQLList, GraphQLObjectType } from "graphql";
import RoomGQLType from "./Room.gql.type";
import ProfileGQLType from "./Profile.gql.type";

const RoomInformationGQLType = new GraphQLObjectType({
	name: "RoomInformation",
	fields: {
		information: { type: RoomGQLType },
		members: { type: new GraphQLList(ProfileGQLType) },
	},
});

export default RoomInformationGQLType;
