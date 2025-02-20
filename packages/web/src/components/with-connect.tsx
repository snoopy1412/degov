"use client";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";

interface WithConnectProps {
  children: React.ReactNode;
}
export function WithConnect({ children }: WithConnectProps) {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (!address) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-[20px]">
        <Image
          src="/assets/image/avatar.svg"
          alt="avatar"
          width={70}
          height={70}
        />
        <p className="text-[14px]">
          Explore more features by connecting your wallet.
        </p>
        <Button className="rounded-full" onClick={openConnectModal}>
          Connect Wallet
        </Button>
      </div>
    );
  }

  return children;
}
