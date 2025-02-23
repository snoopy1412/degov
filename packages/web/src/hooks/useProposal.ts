import { Interface, InterfaceAbi } from "ethers";
import { useAccount, useWriteContract } from "wagmi";
import { abi as governorAbi } from "@/config/abi/governor";
import { useConfig } from "./useConfig";
import { useCallback } from "react";

export interface ProposalActionParam {
  target: `0x${string}`;
  value: bigint;
  abi: InterfaceAbi;
  functionName: string;
  params: readonly unknown[];
}

export const useProposal = () => {
  const daoConfig = useConfig();
  const { address } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();

  const createProposal = useCallback(
    async (description: string, actions: ProposalActionParam[]) => {
      try {
        const targets: `0x${string}`[] = [];
        const values: bigint[] = [];
        const calldatas: `0x${string}`[] = [];

        for (const action of actions) {
          const iface = new Interface(action.abi);
          const func = iface.getFunction(action.functionName);
          const calldata = iface.encodeFunctionData(
            func!,
            action.params
          ) as `0x${string}`;

          targets.push(action.target);
          values.push(action.value);
          calldatas.push(calldata);
        }

        console.log(
          "targets",
          targets,
          "values",
          values,
          "calldatas",
          calldatas,
          "description",
          description,
          "address",
          address
        );
        if (
          targets.length === 0 &&
          values.length === 0 &&
          calldatas.length === 0
        ) {
          if (!address) throw new Error("No wallet connected");

          targets.push(address as `0x${string}`);
          values.push(BigInt(0));
          calldatas.push("0x" as `0x${string}`);
        }

        const data = await writeContractAsync({
          address: daoConfig?.contracts?.governorContract as `0x${string}`,
          abi: governorAbi,
          functionName: "propose",
          args: [targets, values, calldatas, description],
        });

        return data;
      } catch (error) {
        console.error("Failed to create proposal:", error);
        throw error;
      }
    },
    [address, daoConfig, writeContractAsync]
  );

  return {
    createProposal,
    isPending,
  };
};
