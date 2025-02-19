import * as React from 'react';
import { WagmiProvider, deserialize, serialize } from 'wagmi';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
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
  const persister = createSyncStoragePersister({
    serialize,
    storage: window.localStorage,
    deserialize
  });
  const config = createConfig({
    appName: dappConfig?.daoName,
    projectId: dappConfig?.walletConnectProjectId,
    chain: currentChain
  });

  return (
    <WagmiProvider config={config}>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        <RainbowKitProvider
          theme={dark}
          locale="en-US"
          appInfo={{ appName: dappConfig?.daoName }}
          initialChain={currentChain}
        >
          {children}
        </RainbowKitProvider>
      </PersistQueryClientProvider>
    </WagmiProvider>
  );
}
