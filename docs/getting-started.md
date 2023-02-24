# Getting Started

## Installation

::: tip
While not recommended, it is possible to use RaflognJS standalone; without Vue and any build tools.
For more information see [Browser Build](./browser-build.md)
:::

RaflognJS is split into multiple packages:

-   `@raflogn/core`: Contains all the core elements that Raflogn needs to work
-   `@raflogn/engine`: The engine is used to execute the graph
-   `@raflogn/interface-types`: Adds the functionality to assign types to interfaces, which allows only certain connections to be created
-   `@raflogn/renderer-vue`: Used to display and edit the graph in a Vue 3 application

You can install the packages individually or use the combined `raflogn` package:

```bash
# npm
npm i raflogn

# yarn
yarn add raflogn
```

Now you can use Raflogn in your Vue application:

```vue
<template>
    <!--
        By default, the editor completely fills its parent HTML element.
        If you directly use the editor in the <body> element, make sure to use
        a wrapper <div> with specified width and height properties:
        <div style="width: 90vw; height: 90vh">
            <baklava-editor :view-model="baklava" />
        </div>
    -->
    <baklava-editor :view-model="baklava" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { EditorComponent, useRaflogn } from "@raflogn/renderer-vue";
import "@raflogn/themes/dist/syrup-dark.css";

export default defineComponent({
    components: {
        "baklava-editor": EditorComponent,
    },
    setup() {
        const baklava = useRaflogn();
        return { baklava };
    },
});
</script>
```

## Creating your first node

When initializing Raflogn, you can't see any nodes in the palette.
This is because you haven't registered any nodes yet.
To do this, we first need to create a node type, which is essentially a template for the node instances.
In object-oriented programming, the node type is similar to a class and the node instances are instances of that class.

To create a node you can use the `defineNode()` method:

```ts
// file: MyNode.ts
import { defineNode, NodeInterface, NumberInterface, SelectInterface } from "raflogn";

export default defineNode({
    type: "MyNode",
    inputs: {
        number1: () => new NumberInterface("Number", 1),
        number2: () => new NumberInterface("Number", 10),
        operation: () => new SelectInterface("Operation", "Add", ["Add", "Subtract"]).setPort(false),
    },
    outputs: {
        output: () => new NodeInterface("Output", 0),
    },
});
```

Now register the node type so the editor knows it exists:

```ts{5}
import MyNode from "./MyNode";

// this code is from the setup function above
const baklava = useRaflogn();
baklava.editor.registerNodeType(MyNode);
return { baklava };
```

That's it! You should now be able to create nodes and connect them.
