import {
	GraphQLFieldConfig,
	GraphQLFieldConfigArgumentMap,
	GraphQLFieldResolver,
	GraphQLOutputType,
} from "graphql";

abstract class GQLField<T extends GraphQLFieldConfigArgumentMap> {
	private mName: string;
	private mReturn: GraphQLOutputType;
	private mArgs: T;
	protected abstract mResolver: GraphQLFieldResolver<any, T, any, unknown>;

	constructor(name: string, type: GraphQLOutputType, args: T) {
		this.mName = name;
		this.mReturn = type;
		this.mArgs = args;
	}

	public get name(): string {
		return this.mName;
	}

	ToFieldConfig(): GraphQLFieldConfig<any, any, any> {
		return {
			type: this.mReturn,
			args: this.mArgs,
			resolve: this.mResolver,
		};
	}
}

export default GQLField;
