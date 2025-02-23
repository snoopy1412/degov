import { Interface, InterfaceAbi } from "ethers";
import { useWriteContract } from "wagmi";
import { abi as governorAbi } from "@/config/abi/governor";
import { useConfig } from "./useConfig";

export interface ProposalActionParam {
  target: `0x${string}`;
  value: bigint;
  abi: InterfaceAbi;
  functionName: string;
  params: readonly unknown[];
}

export const useProposal = () => {
  const daoConfig = useConfig();
  const { writeContractAsync, isPending } = useWriteContract();

  const createProposal = async (
    description: string,
    actions: ProposalActionParam[]
  ) => {
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

      console.log("targets", targets);
      console.log("values", values);
      console.log("calldatas", calldatas);
      console.log("description", description);

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
  };

  return {
    createProposal,
    isPending,
  };
};
