import { type Abi } from "viem";

// Add these types
type AbiParameter = {
  name: string;
  type: string;
  indexed?: boolean;
  components?: AbiParameter[];
  internalType?: string;
};

type AbiFunctionItem = {
  type: "function";
  name: string;
  inputs: AbiParameter[];
  outputs: AbiParameter[];
  stateMutability: "pure" | "view" | "nonpayable" | "payable";
};

type AbiEventItem = {
  type: "event";
  name: string;
  inputs: AbiParameter[];
  anonymous?: boolean;
};

export type AbiItem = AbiFunctionItem | AbiEventItem;

// Add this validation function
export const isValidAbi = (json: unknown): json is Abi => {
  if (!Array.isArray(json)) {
    return false;
  }

  return json.every((item) => {
    // Check basic structure
    if (
      !item ||
      typeof item !== "object" ||
      !("type" in item) ||
      !("name" in item)
    ) {
      return false;
    }

    // Validate function items
    if (item.type === "function") {
      return (
        typeof item.name === "string" &&
        Array.isArray(item.inputs) &&
        Array.isArray(item.outputs) &&
        typeof item.stateMutability === "string" &&
        ["pure", "view", "nonpayable", "payable"].includes(
          item.stateMutability
        ) &&
        item.inputs.every(
          (input: unknown) =>
            typeof input === "object" &&
            input !== null &&
            "name" in input &&
            "type" in input
        ) &&
        item.outputs.every(
          (output: unknown) =>
            typeof output === "object" && output !== null && "type" in output
        )
      );
    }

    // Validate event items
    if (item.type === "event") {
      return (
        typeof item.name === "string" &&
        Array.isArray(item.inputs) &&
        item.inputs.every(
          (input: unknown) =>
            typeof input === "object" &&
            input !== null &&
            "name" in input &&
            "type" in input &&
            ("indexed" in input ? typeof input.indexed === "boolean" : true)
        )
      );
    }

    return false;
  });
};
