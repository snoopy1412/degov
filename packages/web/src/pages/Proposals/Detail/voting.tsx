import { AddressAvatar } from '@/components/address-avatar';
import { AddressResolver } from '@/components/address-resolver';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { VoteStatusAction } from '@/components/vote-status';
import type { Address } from 'viem';

interface VotingProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  address?: Address;
}

export function Voting({ open, onOpenChange }: VotingProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px] rounded-[26px] border-border/20 bg-card p-[20px] sm:rounded-[26px]">
        <DialogHeader className="flex w-full flex-row items-center justify-between">
          <DialogTitle className="text-[18px] font-normal">Voting</DialogTitle>
          <img
            src="/assets/image/close.svg"
            alt="close"
            className="h-[24px] w-[24px] cursor-pointer transition-opacity hover:opacity-80"
            onClick={() => onOpenChange(false)}
          />
        </DialogHeader>
        <Separator className="my-0 bg-muted-foreground/40" />
        <div className="flex w-[360px] flex-col gap-[20px]">
          <div className="flex items-center gap-[10px]">
            <AddressAvatar address="0x1234567890" className="h-[34px] w-[34px] rounded-full" />
            <AddressResolver address="0x1234567890" showShortAddress>
              {(address) => <span className="text-[14px]">{address}</span>}
            </AddressResolver>
          </div>

          <div className="flex items-center justify-between rounded-[4px] border border-muted-foreground p-[10px]">
            <span className="text-[14px]">Voting power</span>
            <span className="text-[26px] font-semibold">56,487</span>
          </div>

          <div className="flex items-center justify-between rounded-[4px] border border-muted-foreground p-[10px]">
            <span className="text-[14px]">Proposal lD</span>
            <span className="text-[26px] font-semibold">231142...6368</span>
          </div>

          <div className="flex flex-col gap-[20px]">
            <h4 className="text-[14px] font-normal">Vote</h4>
            <div className="flex items-center justify-between gap-[10px]">
              <VoteStatusAction variant="for" type="default" className="w-[113px]" />
              <VoteStatusAction variant="against" type="default" className="w-[113px]" />
              <VoteStatusAction variant="abstain" type="default" className="w-[113px]" />
            </div>
          </div>

          <div className="flex flex-col gap-[20px]">
            <h4 className="text-[14px] font-normal">Add comment</h4>
            <Textarea
              className="rounded-[10px] border border-border/20 bg-card p-[10px]"
              placeholder="Why are you voting this way?"
            />
          </div>
        </div>
        <Separator className="my-0 bg-muted-foreground/40" />
        <Button className="rounded-[100px]">Submit</Button>
      </DialogContent>
    </Dialog>
  );
}
