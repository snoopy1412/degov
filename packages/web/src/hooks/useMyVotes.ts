import { Address, ReadContractErrorType } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { useConfig } from "./useConfig";
import { useGovernanceParams } from "./useGovernanceParams";
import { useGovernanceToken } from "./useGovernanceToken";
import { abi as tokenAbi } from "@/config/abi/token";
import { isNil } from "lodash-es";
import { QueryObserverResult } from "@tanstack/react-query";
import { formatBigIntForDisplay } from "@/utils/number";

interface UseVotesReturn {
  votes?: bigint;
  formattedVotes?: string;
  proposalThreshold?: bigint;
  formattedProposalThreshold?: string;
  hasEnoughVotes: boolean;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<QueryObserverResult<bigint, ReadContractErrorType>>;
}

export function useMyVotes(): UseVotesReturn {
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
    refetch,
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
      ? formatBigIntForDisplay(votes, tokenData.decimals ?? 18)
      : undefined;

  const hasEnoughVotes =
    votes && governanceParams?.proposalThreshold
      ? votes >= governanceParams.proposalThreshold
      : false;

  return {
    votes,
    formattedVotes,
    proposalThreshold: governanceParams?.proposalThreshold,
    formattedProposalThreshold: governanceParams?.proposalThreshold
      ? formatBigIntForDisplay(
          governanceParams.proposalThreshold,
          tokenData?.decimals ?? 18
        )
      : undefined,
    hasEnoughVotes,
    refetch,
    isLoading: isVotesLoading || isTokenLoading || isParamsLoading,
    error,
  };
}
