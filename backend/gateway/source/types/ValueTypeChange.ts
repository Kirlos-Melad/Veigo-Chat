type ValueTypeChange<T, U> = {
	[K in keyof T]: U;
};
