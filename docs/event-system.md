# Event System

Raflogn uses a custom event system to allow for extensibility and plugins.
Each class that supports has an `events` and/or a `hook` property, which can be used to subscribe to an event or tap into a hook.

Most JS event systems need a reference to the listener function to remove an event listener.
However, this doesn't work well with inline arrow-functions.
To support such functions as well, Raflogn uses so-called `tokens` for adding and removing a listener.
The token can be any reference-type (for example and object, array, or `this` when you are in a class) or symbol.
It is provided when adding an event listener and provided again when removing the listener.

```ts
import { RaflognEvent } from "@raflogn/events";
const ev = new RaflognEvent<string, null>(null);
const token = Symbol();
ev.subscribe(token, (data) => {
    console.log("Event triggered:", data);
});
ev.emit("Hello World");
ev.unsubscribe(token);
ev.emit("This won't be printed");

// Console output:
// Event triggered: Hello World
```

## Events

There are two types of events: _normal_ and _preventable_ events.
_Normal_ events are usually fired after an action, to react to that action.
_Preventable_ events, on the other hand, are fired before an action and can be used by the listener to prevent the action from happening.
This is done by returning `false` in a listener function.
Most preventable events have the `before` prefix in their name.

```ts
import { PreventableRaflognEvent } from "@raflogn/events";

const ev = new PreventableRaflognEvent<string, null>(null);

const token = Symbol();
ev.subscribe(token, (data) => {
    if (data === "prevent me") {
        return false;
    }
    console.log(data);
});

function emit(data: string) {
    if (ev.emit(data)) {
        console.log("prevented");
    }
}

emit("prevent me");
emit("this works");

// Console output:
// prevented
// this works
```

This can for example be used to prevent certain connections from being created:

```ts
editor.graphEvents.beforeAddConnection.subscribe(token, (conn) => {
    // check, whether the user should be able to create this connection.
    if (/* user not allowed to create connection */) {
        return false;
    }
});
```

## Hooks

Hooks are similar to events, however, hooks have the ability to pass data from one hook to another.
They are executed in the order they have been tapped into.

## Proxied Events and the Entity Argument

When you wanted to listen to an event on every node in Raflogn v1, you had to subscribe to the event for every node manually.
Thanks to _proxied events_ this is no longer the case in Raflogn v2.

Let's say you want to listen to the `update` event of every node in all graphs:

```ts
const token = Symbol()
editor.nodeEvents.update.subscribe(token, (data, node) => {
    // put your code here
});
```

As you can see, events actually receive two arguments:
1. The event data, like in Raflogn v1
2. The entity that emitted the event

In our case this allows us to determine which node emitted the event and do some special handling, for example.

You can find out what event provides what entity type in the API reference, but usually node events provide the emitting node, graph events the emitting graph and so on.
