<template>
    <button class="raflogn-button --block" :title="intf.name" @click="onClick">
        {{ intf.name }}
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NodeInterface } from "@raflogn/core";

export default defineComponent({
    props: {
        intf: {
            type: Object as () => NodeInterface,
            required: true,
        },
    },
    emits: ["openSidebar"],
    setup(props, { emit }) {
        const onClick = () => {
            emit("openSidebar");
        };

        return { onClick };
    },
});
</script>
