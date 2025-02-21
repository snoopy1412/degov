"use client";
import * as React from "react";
import { WagmiProvider, deserialize, serialize } from "wagmi";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createConfig } from "@/config/wagmi";
import { useConfig } from "@/hooks/useConfig";
import "@rainbow-me/rainbowkit/styles.css";
import { Chain, darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient } from "@tanstack/react-query";

const dark = darkTheme({
  borderRadius: "medium",
  accentColor: "hsl(var(--nextui-primary-500))",
});

export function DAppProvider({ children }: React.PropsWithChildren<unknown>) {
  const dappConfig = useConfig();
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1_000 * 60 * 60 * 24,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  if (!dappConfig) {
    return null;
  }

  const currentChain: Chain = {
    id: Number(dappConfig.network?.chainId),
    name: dappConfig.network?.chain,
    nativeCurrency: {
      name: dappConfig.network?.nativeToken?.symbol,
      symbol: dappConfig.network?.nativeToken?.symbol,
      decimals: dappConfig.network?.nativeToken?.decimals,
    },
    rpcUrls: {
      default: {
        http: dappConfig.network?.rpc,
      },
    },
    blockExplorers: {
      default: dappConfig.network?.explorer,
    },
  };

  const persister = createSyncStoragePersister({
    serialize,
    storage: window.localStorage,
    deserialize,
  });

  const config = createConfig({
    appName: dappConfig?.daoName,
    projectId: dappConfig?.walletConnectProjectId,
    chain: currentChain,
  });

  return (
    <WagmiProvider config={config}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
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
