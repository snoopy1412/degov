import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "./ui/separator";
import { AddressWithAvatar } from "./address-with-avatar";
import type { Address } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { useConfig } from "@/hooks/useConfig";
import { abi as tokenAbi } from "@/config/abi/token";
import { formatBigIntForDisplay } from "@/utils/number";
import { useGovernanceToken } from "@/hooks/useGovernanceToken";
import { useDelegate } from "@/hooks/useDelegate";
import { useCallback, useState } from "react";
import { TransactionToast } from "./transaction-toast";
import { toast } from "react-toastify";
interface DelegateActionProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  address?: Address;
}

export function DelegateAction({
  open,
  onOpenChange,
  address,
}: DelegateActionProps) {
  const daoConfig = useConfig();
  const [hash, setHash] = useState<string | null>(null);
  const { address: account } = useAccount();
  const { data: governanceToken, isLoading: isLoadingGovernanceToken } =
    useGovernanceToken();

  const { data: tokenBalance, isLoading: isLoadingTokenBalance } =
    useReadContract({
      address: daoConfig?.contracts?.governorToken?.contract as `0x${string}`,
      abi: tokenAbi,
      functionName: "balanceOf",
      args: [account as `0x${string}`],
    });

  const { delegate, isPending: isPendingDelegate } = useDelegate();

  const handleDelegate = useCallback(async () => {
    try {
      const hash = await delegate(address as Address);
      if (hash) {
        onOpenChange?.(false);
        setHash(hash);
      }
    } catch (error) {
      toast.error(
        (error as { shortMessage: string })?.shortMessage ??
          "Failed to delegate votes"
      );
    }
  }, [address, delegate, onOpenChange]);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[400px] rounded-[26px] border-border/20 bg-card p-[20px] sm:rounded-[26px]">
          <DialogHeader className="flex w-full flex-row items-center justify-between">
            <DialogTitle className="text-[18px] font-extrabold">
              Delegate
            </DialogTitle>
            <Image
              src="/assets/image/close.svg"
              alt="close"
              width={24}
              height={24}
              className="cursor-pointer transition-opacity hover:opacity-80"
              onClick={() => onOpenChange(false)}
            />
          </DialogHeader>
          <Separator className="my-0 bg-muted-foreground/40" />
          <div className="flex h-[87px] w-[360px] items-center justify-center gap-[20px] rounded-[10px] bg-secondary p-[20px]">
            <AddressWithAvatar
              address={address ?? "0x0000000000000000000000000000000000000000"}
              avatarSize={40}
              textClassName="text-[18px] font-semibold"
            />
          </div>
          <Separator className="my-0 bg-muted-foreground/40" />
          <div className="flex flex-col gap-[20px]">
            <Button
              className="w-full rounded-[100px]"
              isLoading={
                isLoadingTokenBalance ||
                isLoadingGovernanceToken ||
                isPendingDelegate
              }
              onClick={handleDelegate}
            >
              Delegate votes{" "}
              {tokenBalance
                ? formatBigIntForDisplay(
                    tokenBalance,
                    governanceToken?.decimals ?? 18
                  )
                : 0}{" "}
              {governanceToken?.symbol}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {hash && (
        <TransactionToast
          hash={hash as `0x${string}`}
          onSuccess={() => setHash(null)}
        />
      )}
    </>
  );
}
