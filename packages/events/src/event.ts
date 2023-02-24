import { Subscribable } from "./subscribable";

export type EventListener<T, E> = (data: T, entity: E) => any;

export interface IRaflognEventEmitter {
    events: Record<string, RaflognEvent<any, any>>;
}

/** Main event class for Raflogn */
export class RaflognEvent<T, E> extends Subscribable<EventListener<T, E>> {
    public constructor(protected readonly entity: E) {
        super();
    }

    /**
     * Invoke all listeners
     * @param data The data to invoke the listeners with.
     */
    public emit(data: T) {
        this.listeners.forEach((l) => l(data, this.entity));
    }
}

/** Extension for the [[RaflognEvent]] class. A listener can return `false` to prevent
 * this event from happening.
 */
export class PreventableRaflognEvent<T, E> extends RaflognEvent<T, E> {
    /**
     * Invoke all listeners.
     * @param data The data to invoke all listeners with
     * @returns `true` when one of the listeners requested to prevent the event, otherwise `false`
     */
    public emit(data: T) {
        for (const l of Array.from(this.listeners.values())) {
            if (l(data, this.entity) === false) {
                return true;
            }
        }
        return false;
    }
}
