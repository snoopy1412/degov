interface Links {
  website?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  github?: string;
  email?: string;
}

interface NetworkInfo {
  chain: string;
  chainId: string;
  rpc: string[];
  explorer: {
    name: string;
    url: string;
  };
}

interface TokenInfo {
  governorContract: string;
  tokenContract: string;
  timeLockContract: string;
  name: string;
  symbol: string;
  decimals: number;
}

interface TokenDetails {
  logo: string;
  chain: string;
  contract: string;
  symbol: string;
  decimals: number;
}

interface TimelockAssetsTokenInfo {
  [key: string]: TokenDetails;
}

interface Config {
  logo: string;
  walletConnectProjectId: string;
  daoName: string;
  description: string;
  links: Links;
  networkInfo: NetworkInfo;
  tokenInfo: TokenInfo;
  timelockAssetsTokenInfo: TimelockAssetsTokenInfo;
}

export type { Config, Links, NetworkInfo, TokenInfo, TokenDetails, TimelockAssetsTokenInfo };
