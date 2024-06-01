type EventHandlers<T extends Record<string, any[]>> = {
	[K in keyof T]: (...args: T[K]) => Awaitable<void>;
};
