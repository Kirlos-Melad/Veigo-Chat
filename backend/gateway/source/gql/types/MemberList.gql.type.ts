import { GraphQLList, GraphQLObjectType } from "graphql";
import MemberRoomGQLType from "./MemberRoom.gql.type";

const MemberListGQLType = new GraphQLObjectType({
	name: "MemberList",
	fields: {
		messages: { type: new GraphQLList(MemberRoomGQLType) },
	},
});

export default MemberListGQLType;
