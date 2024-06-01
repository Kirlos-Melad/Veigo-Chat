abstract class Event<
	T extends Record<string, any[]>,
	U extends keyof T = keyof T,
> {
	protected mName: U;

	public constructor(name: U) {
		this.mName = name;
	}

	public abstract listener: EventHandlers<T>[U];

	public get name() {
		return this.mName;
	}
}

export default Event;
