import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Button } from './ui/button';
import { useConfig } from '@/hooks/useConfig';

export const ConnectButton = () => {
  const { openConnectModal } = useConnectModal();
  const dappConfig = useConfig();
  const { isConnected, chainId, address } = useAccount();

  if (!isConnected && openConnectModal) {
    return (
      <Button onClick={openConnectModal} className="rounded-[100px]">
        Connect Wallet
      </Button>
    );
  }

  if (chainId !== dappConfig?.networkInfo?.chainId) {
    return <Button>Error Chain</Button>;
  }

  if (address) {
    return <Button>{address}</Button>;
  }

  return null;
};
