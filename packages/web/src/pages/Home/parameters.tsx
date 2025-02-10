import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export const Parameters = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full border-border bg-card" size="sm">
          Parameters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="flex w-[240px] flex-col gap-[20px] rounded-[14px] border-border/20 bg-card p-[20px]"
        align="start"
      >
        <div className="text-[16px] font-semibold text-foreground">Parameters</div>
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center justify-between gap-[10px]">
            <span className="text-[14px] font-normal text-foreground/40">Proposal threshold</span>
            <span className="text-[14px] font-normal text-foreground">4</span>
          </div>

          <div className="flex items-center justify-between gap-[10px]">
            <span className="text-[14px] font-normal text-foreground/40">Quorum needed</span>
            <span className="text-[14px] font-normal text-foreground">7</span>
          </div>

          <div className="flex items-center justify-between gap-[10px]">
            <span className="text-[14px] font-normal text-foreground/40">Proposal delay</span>
            <span className="text-[14px] font-normal text-foreground">2 mins</span>
          </div>

          <div className="flex items-center justify-between gap-[10px]">
            <span className="text-[14px] font-normal text-foreground/40">Voting period</span>
            <span className="text-[14px] font-normal text-foreground">15 mins</span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
