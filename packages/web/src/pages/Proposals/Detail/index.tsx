import ClipboardIconButton from '@/components/clipboard-icon-button';
import { ProposalStatus } from '@/components/proposal-status';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Result } from './result';
import { CurrentVotes } from './current-votes';
import { ActionsTable } from './actions-table';
import { Proposal } from './proposal';
import Status from './status';
import { useState } from 'react';
import { Voting } from './voting';
import { AddressWithAvatar } from '@/components/address-with-avatar';

export const Detail = () => {
  const [voting, setVoting] = useState(false);
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
            <ProposalStatus status="active" />

            <div className="flex items-center justify-end gap-[10px]">
              <Button className="h-[37px] rounded-[100px]" onClick={() => setVoting(true)}>
                Vote Onchain
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <img
                    src="/assets/image/more.svg"
                    alt="more"
                    className="size-[36px] cursor-pointer transition-opacity hover:opacity-80"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="flex w-[240px] flex-col gap-[10px] rounded-[14px] border-border/20 bg-card p-[10px]"
                  align="end"
                >
                  <DropdownMenuItem className="cursor-pointer p-[10px]">
                    <img src="/assets/image/proposal/copy.svg" alt="copy" />
                    <span>Copy URL</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer p-[10px]">
                    <img src="/assets/image/proposal/explorer.svg" alt="block" />
                    <span>View on Block Explorer</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer p-[10px]">
                    <img src="/assets/image/proposal/cancel.svg" alt="cancel" />
                    <span>Cancel Proposal</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <h2 className="text-[36px] font-extrabold">
            [Non-Constitutional] DCDAO Delegate Incentive Program
          </h2>

          <div className="flex items-center gap-[20px]">
            <div className="flex items-center gap-[5px]">
              <span>Proposed by</span>
              <AddressWithAvatar address="0x1234567890" avatarSize={24} className="gap-[5px]" />
            </div>
            <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
            <div className="flex items-center gap-[5px]">
              <span>ID 101924...5972</span>
              <ClipboardIconButton text="101924...5972" size={14} />
            </div>
            <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
            <span>Proposed on: Jan 6th, 2025</span>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_360px] gap-[20px]">
          <div className="space-y-[20px]">
            <Result />
            <ActionsTable />
            <Proposal />
          </div>

          <div className="space-y-[20px]">
            <CurrentVotes />
            <Status />
          </div>
        </div>
      </div>

      <Voting open={voting} onOpenChange={setVoting} />
    </>
  );
};
