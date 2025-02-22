import { Address } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { useConfig } from "./useConfig";
import { useGovernanceParams } from "./useGovernanceParams";
import { useGovernanceToken } from "./useGovernanceToken";
import { formatUnits } from "viem";
import { abi as tokenAbi } from "@/config/abi/token";
import { isNil } from "lodash-es";

interface UseVotesReturn {
  votes: bigint | null;
  formattedVotes: string | null;
  hasEnoughVotes: boolean;
  isLoading: boolean;
  error: Error | null;
}

export function useVotes(): UseVotesReturn {
  const { address } = useAccount();
  const daoConfig = useConfig();
  const { data: tokenData, isLoading: isTokenLoading } = useGovernanceToken();
  const { data: governanceParams, isLoading: isParamsLoading } =
    useGovernanceParams();

  const tokenAddress = daoConfig?.contracts?.governorToken?.contract as Address;

  const {
    data: votes,
    isLoading: isVotesLoading,
    error,
  } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "getVotes",
    args: [address!],
    query: {
      enabled: Boolean(address) && Boolean(tokenAddress),
    },
  });

  const formattedVotes =
    !isNil(votes) && !isNil(tokenData?.decimals)
      ? formatUnits(votes, tokenData.decimals)
      : null;

  const hasEnoughVotes =
    votes && governanceParams?.proposalThreshold
      ? votes >= governanceParams.proposalThreshold
      : false;

  return {
    votes: votes as bigint | null,
    formattedVotes,
    hasEnoughVotes,
    isLoading: isVotesLoading || isTokenLoading || isParamsLoading,
    error,
  };
}
