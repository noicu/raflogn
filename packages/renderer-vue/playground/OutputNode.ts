import { defineNode } from "@raflogn/core";
import { setType } from "@raflogn/interface-types";
import { TextInputInterface, CheckboxInterface, TextInterface } from "../src";
import { booleanType, stringType } from "./interfaceTypes";

export default defineNode({
    type: "OutputNode",
    inputs: {
        text: () => new TextInputInterface("Text", "").use(setType, stringType),
        boolean: () => new CheckboxInterface("Boolean", false).use(setType, booleanType),
    },
    outputs: {
        text: () => new TextInterface("output", "").setPort(false),
        data: () => new TextInterface("data", "test").setHidden(true),
    },
    calculate({ text }, { globalValues }) {
        return { text, data: globalValues };
    },
});
