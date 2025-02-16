import { AddressWithAvatarFull } from '@/components/address-with-avatar-full';
import { VoteStatus } from '@/components/vote-status';

export const Comment = () => {
  return (
    <div className="flex flex-col gap-[20px] border-b border-border/20 p-[20px]">
      <div className="flex items-center justify-between gap-[10px]">
        <AddressWithAvatarFull address="0x1234567890123456789012345678901234567890" />

        <div className="flex items-center gap-[10px]">
          <span className="text-[14px] text-white/50">2025-02-11 12:00:00</span>
          <VoteStatus variant="for" className="h-[30px]" />
        </div>
      </div>

      <p>
        The Event Horizon Community Voted to Support this Proposal
        ehARB-60:EventHorizon.vote/vote/arbitrum/ehARB-60
      </p>
    </div>
  );
};
