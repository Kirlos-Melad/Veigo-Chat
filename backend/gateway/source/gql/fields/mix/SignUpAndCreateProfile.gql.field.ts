import {
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLObjectType,
} from "graphql";
import { Metadata, ServiceError } from "@grpc/grpc-js";

import GQLField from "@root/source/gql/fields/GQLField";
import GRPCServiceManagerRegistry from "@source/grpc/GRPCServiceManagerRegistry";
import LoginResponseGQLType from "../../types/LoginResponse.gql.type";
import { AuthenticationResponse } from "@root/source/types/generated/protos/authentication/AuthenticationResponse";
import { GQLContext } from "../../GQLHandler";
import ProfileGQLType from "../../types/Profile.gql.type";
import { Args as SignUpArgs } from "../authentication/SignUp.gql.field";
import { Args as CreateProfileArgs } from "../profile/Profile.create.gql.field";
import { ProfileObject } from "@root/source/types/generated/protos/chat_objects/ProfileObject";

const Args: GraphQLFieldConfigArgumentMap = {
	...SignUpArgs,
	...CreateProfileArgs,
};

type Args = typeof Args;

class SignUpAndCreateProfileGQLField extends GQLField<Args> {
	constructor() {
		super({
			type: "mutation",
			name: "SignUpAndCreateProfile",
			args: Args,
			outputType: new GraphQLObjectType({
				name: "SignUpAndCreateProfileResponse",
				fields: {
					account: {
						type: LoginResponseGQLType.getFields().account.type,
					},
					profile: {
						type: ProfileGQLType,
					},
					token: {
						type: LoginResponseGQLType.getFields().token.type,
					},
				},
			}),
			isGuarded: false,
		});
	}

	protected mResolver: GraphQLFieldResolver<any, GQLContext, Args, unknown> =
		async (source: any, args: Args, context: GQLContext) => {
			const signUpResponse = await new Promise<AuthenticationResponse>(
				(resolve, reject) =>
					GRPCServiceManagerRegistry.instance
						.Get("Auth")
						.Get("Authentication")
						.SignUp(
							args,
							this.mIsGuarded
								? context.metadata!
								: new Metadata(),
							(
								error: ServiceError | null,
								response: AuthenticationResponse | undefined,
							) => (error ? reject(error) : resolve(response!)),
						),
			);

			const metadata = new Metadata();
			metadata.set("token", signUpResponse.token!.access!);

			const createProfileResponse = await new Promise((resolve, reject) =>
				GRPCServiceManagerRegistry.instance
					.Get("Chat")
					.Get("Profile")
					.Create(
						args,
						metadata,
						(
							error: ServiceError | null,
							response: ProfileObject | undefined,
						) => (error ? reject(error) : resolve(response!)),
					),
			);

			return {
				account: signUpResponse.account,
				profile: createProfileResponse,
				token: signUpResponse.token,
			};
		};
}

export default new SignUpAndCreateProfileGQLField();
