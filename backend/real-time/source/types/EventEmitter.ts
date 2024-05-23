import { TypedEmitter } from "tiny-typed-emitter";

import DependencyLoader from "@source/utilities/DependencyLoader";
import Logger from "@source/utilities/Logger";
import Event from "../types/Event";

abstract class EventEmitter<
	T extends Record<string, any[]>,
> extends TypedEmitter<EventHandlers<T>> {
	protected mEventsPath: string;

	public constructor(eventsPath: string) {
		super();
		this.mEventsPath = eventsPath;
	}

	public async LoadEvents() {
		const loadedEvents = await DependencyLoader(this.mEventsPath);

		for (const { default: event } of loadedEvents) {
			const e = new event();
			if (e instanceof Event) {
				Logger.information(`Loaded event ${e.name}`);
				this.AddEvent(e);
			} else {
				Logger.warning(`An event is missing`);
			}
		}
	}

	private AddEvent(event: Event<T>) {
		this.on(event.name, event.listener);
	}
}

export default EventEmitter;
