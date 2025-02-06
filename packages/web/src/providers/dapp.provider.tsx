import * as React from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { createConfig, queryClient } from '@/config/wagmi';
import { useConfig } from '@/hooks/useConfig';
import '@rainbow-me/rainbowkit/styles.css';
import { Chain, darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';

const dark = darkTheme({
  borderRadius: 'medium',
  accentColor: 'hsl(var(--nextui-primary-500))'
});

export function DAppProvider({ children }: React.PropsWithChildren<unknown>) {
  const dappConfig = useConfig();

  if (!dappConfig) return null;

  const currentChain: Chain = {
    id: Number(dappConfig.networkInfo?.chainId),
    name: dappConfig.networkInfo?.chain,
    nativeCurrency: {
      name: dappConfig.tokenInfo?.name,
      symbol: dappConfig.tokenInfo?.symbol,
      decimals: dappConfig.tokenInfo?.decimals
    },
    rpcUrls: {
      default: {
        http: dappConfig.networkInfo?.rpc
      }
    },
    blockExplorers: {
      default: dappConfig.networkInfo?.explorer
    }
  };

  const config = createConfig({
    appName: dappConfig?.daoName,
    projectId: dappConfig?.projectId,
    chain: currentChain
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={dark}
          locale="en-US"
          appInfo={{ appName: dappConfig?.daoName }}
          initialChain={currentChain}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
