import { useReadContracts } from "wagmi";
import { abi as tokenAbi } from "@/config/abi/token";
import { useConfig } from "./useConfig";
import type { Address } from "viem";

interface GovernanceTokenMetadata {
  symbol: string;
  name: string;
  decimals: number;
}

interface UseGovernanceTokenReturn {
  data: GovernanceTokenMetadata | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch governance token metadata
 * @param tokenAddress - The address of the governance token contract
 */
export function useGovernanceToken(): UseGovernanceTokenReturn {
  const daoConfig = useConfig();
  const tokenAddress = daoConfig?.contracts?.governorToken?.contract as Address;
  const { data, isLoading, error } = useReadContracts({
    contracts: [
      {
        address: tokenAddress,
        abi: tokenAbi,
        functionName: "symbol",
      },
      {
        address: tokenAddress,
        abi: tokenAbi,
        functionName: "name",
      },
      {
        address: tokenAddress,
        abi: tokenAbi,
        functionName: "decimals",
      },
    ],
    query: {
      enabled: Boolean(tokenAddress),
    },
  });

  const formattedData: GovernanceTokenMetadata | null = data
    ? {
        symbol: data[0].result as string,
        name: data[1].result as string,
        decimals: data[2].result ? Number(data[2].result) : 18,
      }
    : null;

  return {
    data: formattedData,
    isLoading,
    error: error as Error | null,
  };
}
