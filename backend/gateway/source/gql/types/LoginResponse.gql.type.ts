import { GraphQLObjectType } from "graphql";
import AccountGQLType from "./Account.gql.type";
import TokenGQLType from "./Token.gql.type";

const LoginResponseGQLType = new GraphQLObjectType({
	name: "LoginResponse",
	fields: {
		account: { type: AccountGQLType },
		token: { type: TokenGQLType },
	},
});

export default LoginResponseGQLType;
