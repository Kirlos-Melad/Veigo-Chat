import {
	GraphQLFieldConfig,
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLOutputType,
} from "graphql";
import { GQLContext } from "../gql/GQLHandler";
import Authorize from "../utilities/Authorize";
import { Metadata } from "@grpc/grpc-js";

type GQLFieldType = "query" | "mutation";

abstract class GQLField<T extends GraphQLFieldConfigArgumentMap> {
	private mType: GQLFieldType;
	private mName: string;
	private mOutputType: GraphQLOutputType;
	private mArgs: T;
	protected readonly mIsGuarded: boolean;

	protected abstract mResolver: GraphQLFieldResolver<
		any,
		GQLContext,
		T,
		unknown
	>;

	constructor(configs: {
		type: GQLFieldType;
		name: string;
		outputType: GraphQLOutputType;
		args: T;
		isGuarded: boolean;
	}) {
		const { type, name, outputType, args, isGuarded } = configs;
		this.mType = type;
		this.mName = name;
		this.mOutputType = outputType;
		this.mArgs = args;
		this.mIsGuarded = isGuarded;
	}

	public get type(): GQLFieldType {
		return this.mType;
	}

	public get name(): string {
		return this.mName;
	}

	private Guard(resolver: GraphQLFieldResolver<any, GQLContext, T, unknown>) {
		const guard = async (
			source: any,
			args: any,
			context: GQLContext,
			info: any,
		) => {
			const token = await Authorize(context.authorizationHeader);
			const metadata = new Metadata();
			metadata.add("token", token);

			await resolver(source, args, context, info);
		};
		return guard as GraphQLFieldResolver<any, GQLContext, T, unknown>;
	}

	ToFieldConfig(): GraphQLFieldConfig<any, any, any> {
		return {
			type: this.mOutputType,
			args: this.mArgs,
			resolve: this.mIsGuarded
				? this.Guard(this.mResolver)
				: this.mResolver,
		};
	}
}

export default GQLField;
