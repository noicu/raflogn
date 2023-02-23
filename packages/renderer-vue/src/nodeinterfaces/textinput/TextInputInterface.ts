import { markRaw } from "vue";
import { NodeInterface } from "@raflogn/core";
import TextInputInterfaceComponent from "./TextInputInterface.vue";

export class TextInputInterface extends NodeInterface<string> {
    component = markRaw(TextInputInterfaceComponent);
}

export { TextInputInterfaceComponent };
