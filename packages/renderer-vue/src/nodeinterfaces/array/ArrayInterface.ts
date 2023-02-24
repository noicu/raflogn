import { markRaw } from "vue";
import { NodeInterface } from "@raflogn/core";
import ArrayInterfaceComponent from "./ArrayInterface.vue";

export class ArrayInterface extends NodeInterface<Array<any>> {
    component = markRaw(ArrayInterfaceComponent);
}

export { ArrayInterfaceComponent };
