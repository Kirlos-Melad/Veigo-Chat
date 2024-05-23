type EventArguments<T> = {
	[K in keyof T]: T[K] extends (...args: infer Args) => void ? Args : never;
};