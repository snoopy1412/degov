import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';

interface WithConnectProps {
  children: React.ReactNode;
}
export function WithConnect({ children }: WithConnectProps) {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (!address) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-[20px]">
        <img src="/assets/image/avatar.svg" alt="avatar" className="size-[70px]" />
        <p className="text-[14px]">Explore more features by connecting your wallet.</p>
        <Button className="rounded-full" onClick={openConnectModal}>
          Connect Wallet
        </Button>
      </div>
    );
  }

  return children;
}
