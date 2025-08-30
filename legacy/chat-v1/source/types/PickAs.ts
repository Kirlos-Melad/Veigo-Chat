type PickAs<
	T,
	K extends Exclude<keyof T, K extends `${infer A}:${string}` ? A : never>,
> = Normalize<
	UnionToIntersection<
		K extends `${infer A}:${infer B}`
			? A extends keyof T
				? { [key in B]: T[A] }
				: { [key in A]: "Key not found" }
			: never
	> &
		Pick<T, Extract<K, keyof T>>
>;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
	k: infer I,
) => void
	? I
	: never;

type Normalize<T> = { [K in keyof T]: T[K] };
