import { Subscribable } from "./subscribable";

export type EventListener<T, E> = (data: T, entity: E) => any;
export type PreventableEventListener<T, E> = (data: T, prevent: () => void, entity: E) => any;

export interface IRaflognEventEmitter {
    events: Record<string, RaflognEvent<any, any> | PreventableRaflognEvent<any, any>>;
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

/**
 * Extension for the {@link RaflognEvent} class. A listener can return `false` to prevent
 * this event from happening.
 */
export class PreventableRaflognEvent<T, E> extends Subscribable<PreventableEventListener<T, E>> {
    public constructor(protected readonly entity: E) {
        super();
    }

    /**
     * Invoke all listeners.
     * @param data The data to invoke all listeners with
     * @returns An object, where the `prevented` field is `true` when one of the listeners requested to prevent the event, otherwise `false`
     */
    public emit(data: T): { prevented: boolean } {
        let prevented = false;
        const prevent = () => [(prevented = true)];
        for (const l of Array.from(this.listeners.values())) {
            l(data, prevent, this.entity);
            if (prevented) {
                return { prevented: true };
            }
        }
        return { prevented: false };
    }
}
