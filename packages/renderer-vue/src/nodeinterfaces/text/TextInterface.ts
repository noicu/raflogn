import { type ComponentOptions, markRaw } from "vue";
import { NodeInterface } from "@raflogn/core";
import TextInterfaceComponent from "./TextInterface.vue";

export class TextInterface extends NodeInterface<string> {
    component = markRaw(TextInterfaceComponent) as ComponentOptions;

    public constructor(name: string, value: string) {
        super(name, value);
        this.setPort(false);
    }
}
