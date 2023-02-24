import { defineNode, NodeInterface } from "@raflogn/core";
import { setType } from "@raflogn/interface-types";
import { NumberInterface, SelectInterface } from "../src";
import { numberType } from "./interfaceTypes";

export default defineNode({
    type: "MathNode",
    inputs: {
        number1: () => new NumberInterface("Number", 1).use(setType, numberType),
        number2: () => new NumberInterface("Number", 10).use(setType, numberType),
        operation: () => new SelectInterface("Operation", "Add", ["Add", "Subtract"]).setPort(false),
    },
    outputs: {
        output: () => new NodeInterface("Output", 0).use(setType, numberType),
    },
    calculate({ number1, number2, operation }) {
        let output: number;
        if (operation === "Add") {
            output = number1 + number2;
        } else if (operation === "Subtract") {
            output = number1 - number2;
        } else {
            throw new Error(`Unknown operation: ${operation}`);
        }
        return { output };
    },
});
