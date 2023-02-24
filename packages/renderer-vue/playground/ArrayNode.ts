import { defineNode } from "@raflogn/core";
import { ArrayInterface } from "../src";
import { setType } from "@raflogn/interface-types";
import {  arrayType } from "./interfaceTypes";

export default defineNode({
    type: "ArrayNode",
    inputs: {
        input: () => new ArrayInterface("Input", []).use(setType, arrayType),
    },
    outputs: {
        output: () => new ArrayInterface("Output", []).use(setType, arrayType),
    },
    calculate({ input }) {
        return { output: input };
    },
});
