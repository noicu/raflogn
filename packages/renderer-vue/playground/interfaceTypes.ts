import { NodeInterfaceType } from "@raflogn/interface-types";
import "./interfaceTypes.css";

export const stringType = new NodeInterfaceType<string>("string");
export const numberType = new NodeInterfaceType<number>("number");
export const booleanType = new NodeInterfaceType<boolean>("boolean");
export const arrayType = new NodeInterfaceType<Array<any>>("array");
export const objectType = new NodeInterfaceType<object>("object");

stringType.addConversion(numberType, (v) => parseFloat(v));
numberType.addConversion(stringType, (v) => (v !== null && v !== undefined && v.toString()) || "0");
booleanType.addConversion(stringType, (v) => (typeof v === "boolean" ? v.toString() : "null"));
