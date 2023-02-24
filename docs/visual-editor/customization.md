# Customization

Raflogn offers many levels of customization, from simple theming up to full-blown custom components.

## Theming

You can use a theme by installing the `@raflogn/themes` package and importing the theme-specific CSS file.

For example:

```js
import "@raflogn/themes/syrup-dark.css";
```

There are currently two themes available:

-   Classic (Raflogn v1 theme): `classic.css`
-   Syrup Dark: `syrup-dark.css`

Raflogn's themes make heavy use of CSS variables.
This means that you can easily change colors or other visual properties by overriding the values of the variables in your CSS.
Check out [this file](https://github.com/noicu/raflogn/blob/dev-v2.0/packages/themes/src/classic/variables.scss) for a list of variables.

## CSS Classes

Raflogn applies different CSS classes to the HTML elements to make customization via CSS as easy as possible.
You can override styles to customize most aspects of the look and feel.
Apart from the [standard CSS classes](#list-of-css-classes), Raflogn also sets certain `data-` properties you can use for styling.

For example, to make all nodes of type `MyNodeType` have a blue background, you can use the following CSS:

```css
.raflogn-node[data-node-type="MyNodeType"] {
    background-color: lightblue;
}
```

## Custom Components

If these options don't fulfill your needs for customization, you can provide custom components.
For this, the editor provides the following slots:

-   `background` [(default component)](https://github.com/noicu/raflogn/blob/dev-v2.0/packages/renderer-vue/src/editor/Background.vue)
-   `toolbar` [(default component)](https://github.com/noicu/raflogn/blob/dev-v2.0/packages/renderer-vue/src/toolbar/Toolbar.vue)
-   `palette` [(default component)](https://github.com/noicu/raflogn/blob/dev-v2.0/packages/renderer-vue/src/nodepalette/NodePalette.vue)
-   `connection` [(default component)](https://github.com/noicu/raflogn/blob/dev-v2.0/packages/renderer-vue/src/connection/ConnectionWrapper.vue)
    -   Props:
        -   `connection` (type: <code><ApiLink type="classes" module="@raflogn/core" name="Connection">Connection</ApiLink></code>)
-   `temporaryConnection` [(default component)](https://github.com/noicu/raflogn/blob/dev-v2.0/packages/renderer-vue/src/connection/TemporaryConnection.vue)
    -   Props:
        -   `temporaryConnection` (type: <code><ApiLink type="interfaces" module="@raflogn/core" name="ITemporaryConnection">ITemporaryConnection</ApiLink> | null</code>)
-   `node` [(default component)](https://github.com/noicu/raflogn/blob/dev-v2.0/packages/renderer-vue/src/node/Node.vue)
    -   Props:
        -   `node` (type: <code><ApiLink type="classes" module="@raflogn/core" name="AbstractNode">AbstractNode</ApiLink></code>)
        -   `selected` (type: `boolean`)
        -   `select` (type: `() => void`) callback for node being selected
-   `sidebar` [(default component)](https://github.com/noicu/raflogn/blob/dev-v2.0/packages/renderer-vue/src/sidebar/Sidebar.vue)
-   `minimap` [(default component)](https://github.com/noicu/raflogn/blob/dev-v2.0/packages/renderer-vue/src/components/Minimap.vue)

So, for example, if you want to use a custom component for a certain node type, you could do it like this:

```vue
<template>
    <Editor>
        <template #node="nodeProps">
            <MyNodeRenderer v-if="nodeProps.node.type === 'MyNodeType'" :key="nodeProps.node.id" v-bind="nodeProps" />
            <RaflognNode v-else :key="nodeProps.node.id" v-bind="nodeProps" />
        </template>
    </Editor>
</template>

<script setup>
import { Editor, Components } from "@raflogn/renderer-vue";
const RaflognNode = Components.Node;

// example, replace with your component:
import MyNodeRenderer from "./MyNodeRenderer.vue";
</script>
```

## List of CSS Classes

Below you can find a list of CSS classes used in Raflogn:

-   **Editor:**
    -   `raflogn-editor`: Base class for the editor
-   **Nodes:**
    -   `raflogn-node`: Base class for each node
    -   `--selected`: Applied when a node is selected
    -   `--dragging`: Applied when a node is being dragged
    -   `--two-column`: Applied if a node is a two-column node
    -   `--palette`: Applied to a node if it is used as an entry in the node palette
    -   `__title`: Title (top-bar) of a node
        -   `__title-label`: Actual title (label) of the node
        -   `__menu`: Contains the three dots (menu button) on the right side of each node
    -   `__content`: Container for the inputs and outputs of the node
        -   `__inputs`: Container for all inputs
        -   `__outputs`: Container for all outputs
-   **Node Interfaces:**
    -   `raflogn-node-interface`: Base class for each node interface
    -   `--input`: Applied when the node interface is an input
    -   `--output`: Applied when the node interface is an output
    -   `--connected`: Applied when the node interface has a connection
    -   `__port`: The "dot" via which the node interface can be connected
-   **Connection:**
    -   `raflogn-connection`: Base class for each connection
    -   `--temporary`: Applied when the connection is still being dragged (in the process of being created or changed)
    -   `--allowed`: Applied when the connection can be created (the default styles display the connection green in this case)
    -   `--forbidden`: Applied when the connection can not be created (the default styles display the connection red in this case) or when this connection would be destroyed when creating a different connection
-   **Sidebar:**
    -   `raflogn-sidebar`: Base class for the sidebar
    -   `--open`: Applied when the sidebar should be visible
    -   `__resizer`: Handle for resizing the sidebar
    -   `__header`: Header of the sidebar.
        -   `__close`: Close button
        -   `__node-name`: The title of the currently selected node
    -   `__interface`: Each interface shown in the sidebar
-   **Toolbar:**
    -   `raflogn-toolbar`: Base class for the toolbar
    -   `raflogn-toolbar-entry`: Base class for each entry in the toolbar
    -   `raflogn-toolbar-button`: This class is applied to every entry that is clickable
-   **Others:**
    -   `raflogn-node-palette`: Base class for the node palette
