<template>
    <div
        class="raflogn-checkbox"
        :class="{ '--checked': intf.value }"
        :title="intf.name"
    >
        <div class="__label">
            {{ intf.name }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { ArrayInterface } from "./ArrayInterface";

export default defineComponent({
    props: {
        intf: {
            type: Object as () => ArrayInterface,
            required: true,
        },
    },
});
</script>
