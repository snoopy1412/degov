"use client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useReadContract } from "wagmi";

import { AddressWithAvatar } from "@/components/address-with-avatar";
import ClipboardIconButton from "@/components/clipboard-icon-button";
import NotFound from "@/components/not-found";
import { ProposalStatus } from "@/components/proposal-status";
import { TransactionToast } from "@/components/transaction-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { abi as GovernorAbi } from "@/config/abi/governor";
import useCancelProposal from "@/hooks/useCancelProposal";
import { useConfig } from "@/hooks/useConfig";
import { proposalService } from "@/services/graphql";
import type { ProposalState } from "@/types/proposal";
import { extractTitleAndDescription } from "@/utils";
import { formatShortAddress } from "@/utils/address";
import { formatTimestampToFriendlyDate } from "@/utils/date";

import { ActionsTable } from "./actions-table";
import { CurrentVotes } from "./current-votes";
import { Proposal } from "./proposal";
import { Result } from "./result";
import Status from "./status";
import { Voting } from "./voting";

export default function ProposalDetailPage() {
  const [voting, setVoting] = useState(false);
  const [cancelHash, setCancelHash] = useState<`0x${string}` | null>(null);
  const daoConfig = useConfig();
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["proposal", id],
    queryFn: () =>
      proposalService.getProposalById(
        daoConfig?.indexer.endpoint as string,
        id as string
      ),
    enabled: !!id && !!daoConfig?.indexer.endpoint,
  });

  const proposalStatus = useReadContract({
    address: daoConfig?.contracts?.governorContract as `0x${string}`,
    abi: GovernorAbi,
    functionName: "state",
    args: [data?.proposalId ? BigInt(data?.proposalId) : 0n],
    query: {
      enabled: !!data?.proposalId && !!daoConfig?.contracts?.governorContract,
    },
  });

  const proposalVotes = useReadContract({
    address: daoConfig?.contracts?.governorContract as `0x${string}`,
    abi: GovernorAbi,
    functionName: "proposalVotes",
    args: [data?.proposalId ? BigInt(data?.proposalId) : 0n],
    query: {
      enabled: !!data?.proposalId && !!daoConfig?.contracts?.governorContract,
    },
  });

  const proposalVotesData = useMemo(() => {
    return {
      againstVotes: proposalVotes.data?.[0] ?? 0n,
      forVotes: proposalVotes.data?.[1] ?? 0n,
      abstainVotes: proposalVotes.data?.[2] ?? 0n,
    };
  }, [proposalVotes.data]);

  const { cancelProposal, isPending: isCancelling } = useCancelProposal();

  const handleCopyUrl = useCallback(
    (e: Event) => {
      e.preventDefault();
      navigator.clipboard.writeText(
        `${window.location.origin}/proposals/${id}`
      );
    },
    [id]
  );

  const handleCancelProposal = useCallback(async () => {
    try {
      const hash = await cancelProposal({
        targets: data?.targets as `0x${string}`[],
        values: data?.values?.map((value) => BigInt(value)) as bigint[],
        calldatas: data?.calldatas as `0x${string}`[],
        description: data?.description as string,
      });
      if (hash) {
        setCancelHash(hash as `0x${string}`);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        (
          error as {
            shortMessage: string;
          }
        )?.shortMessage ?? "Failed to cancel proposal"
      );
    }
  }, [
    cancelProposal,
    data?.calldatas,
    data?.description,
    data?.targets,
    data?.values,
  ]);

  if (!id) {
    return <NotFound />;
  }
  return (
    <>
      <div className="flex w-full flex-col gap-[20px] p-[30px]">
        <div className="flex items-center gap-1 text-[18px] font-extrabold">
          <span className="text-muted-foreground">Proposals</span>
          <span className="text-muted-foreground">/</span>
          <span>Proposal</span>
        </div>

        <div className="flex flex-col gap-[20px] rounded-[14px] bg-card p-[20px]">
          <div className="flex items-center justify-between gap-[20px]">
            {isLoading ? (
              <Skeleton className="h-[37px] w-[100px]" />
            ) : (
              <ProposalStatus status={proposalStatus?.data as ProposalState} />
            )}

            <div className="flex items-center justify-end gap-[10px]">
              <Button
                className="h-[37px] rounded-[100px] focus-visible:ring-0"
                onClick={() => setVoting(true)}
              >
                Vote Onchain
              </Button>
              {isCancelling ? (
                <Loader2 className="h-[36px] w-[36px] animate-spin" />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Image
                      src="/assets/image/more.svg"
                      alt="more"
                      width={36}
                      height={36}
                      className="cursor-pointer transition-opacity hover:opacity-80"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="flex w-[240px] flex-col gap-[10px] rounded-[14px] border-border/20 bg-card p-[10px]"
                    align="end"
                  >
                    <DropdownMenuItem
                      className="cursor-pointer p-[10px]"
                      onSelect={handleCopyUrl}
                    >
                      <Image
                        src="/assets/image/proposal/copy.svg"
                        alt="copy"
                        width={20}
                        height={20}
                      />
                      <span>Copy URL</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer p-[10px]"
                    >
                      <a
                        href={`${daoConfig?.network?.explorer?.url}/tx/${data?.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src="/assets/image/proposal/explorer.svg"
                          alt="block"
                          width={20}
                          height={20}
                        />
                        <span>View on Block Explorer</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer p-[10px]"
                      onSelect={handleCancelProposal}
                    >
                      <Image
                        src="/assets/image/proposal/cancel.svg"
                        alt="cancel"
                        width={20}
                        height={20}
                      />
                      <span>Cancel Proposal</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          <h2 className="text-[36px] font-extrabold">
            {isLoading ? (
              <Skeleton className="h-[36px] w-[200px]" />
            ) : (
              extractTitleAndDescription(data?.description)?.title
            )}
          </h2>

          <div className="flex items-center gap-[20px]">
            <div className="flex items-center gap-[5px]">
              <span>Proposed by</span>
              {isLoading ? (
                <Skeleton className="h-[24px] w-[24px]" />
              ) : (
                !!data?.proposer && (
                  <AddressWithAvatar
                    address={data?.proposer as `0x${string}`}
                    avatarSize={24}
                    className="gap-[5px]"
                  />
                )
              )}
            </div>
            <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
            <div className="flex items-center gap-[5px]">
              {isLoading ? (
                <Skeleton className="h-[24px] w-[24px]" />
              ) : (
                <>
                  <span>
                    ID {formatShortAddress(data?.proposalId as string)}
                  </span>
                  <ClipboardIconButton text={id as string} size={14} />
                </>
              )}
            </div>
            <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
            {isLoading ? (
              <Skeleton className="h-[24px] w-[24px]" />
            ) : (
              <span>
                Proposed on:{" "}
                {formatTimestampToFriendlyDate(data?.blockTimestamp)}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_360px] gap-[20px]">
          <div className="space-y-[20px]">
            <Result />
            <ActionsTable />
            <Proposal data={data} isLoading={isLoading} />
          </div>

          <div className="space-y-[20px]">
            <CurrentVotes proposalVotesData={proposalVotesData} />
            <Status />
          </div>
        </div>
      </div>

      <Voting open={voting} onOpenChange={setVoting} />

      {cancelHash && <TransactionToast hash={cancelHash} />}
    </>
  );
}
