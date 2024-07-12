type Promisify<F extends (...args: any[]) => any> = (
	...args: Parameters<F>
) => Promise<ReturnType<F>>;
