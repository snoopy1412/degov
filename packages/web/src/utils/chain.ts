import { darwinia } from '@/config/chains';
import { ChainId } from '@/types/chain';

import type { Chain } from '@rainbow-me/rainbowkit';

const chainConfigMap: Record<ChainId, Chain> = {
  [ChainId.DARWINIA]: darwinia
};

// Returns an array of all chain configurations
export function getChains(): [Chain, ...Chain[]] {
  const filteredChains: Chain[] = Object.values(chainConfigMap);
  if (filteredChains.length === 0) {
    throw new Error('No suitable chain configurations are available.');
  }
  return filteredChains as [Chain, ...Chain[]];
}

// Returns the chain by its id
export function getChainById(id?: ChainId): Chain | undefined {
  return id ? chainConfigMap[id] : undefined;
}

// Returns the default chain configuration
export function getDefaultChain(): Chain {
  const filteredChains = Object.values(chainConfigMap);
  if (filteredChains.length === 0) {
    throw new Error(
      'No suitable chain configurations are available for the current deployment mode.'
    );
  }

  const defaultChainId = ChainId.DARWINIA;
  const defaultChain = filteredChains.find((chain) => chain.id === defaultChainId);

  return defaultChain || filteredChains[0];
}

// Returns the default chain id based on the default chain
export function getDefaultChainId(): ChainId {
  const defaultChain = getDefaultChain();
  return defaultChain.id;
}

// return if the chain is supported
export function isSupportedChain(chainId: ChainId): boolean {
  const filteredChains = Object.values(chainConfigMap);
  return filteredChains.some((chain) => chain.id === chainId);
}
