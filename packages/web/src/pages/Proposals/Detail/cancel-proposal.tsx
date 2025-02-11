import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import type { Address } from 'viem';

interface DelegateActionProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  address?: Address;
}

export function CancelProposal({ open, onOpenChange }: DelegateActionProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px] rounded-[26px] border-border/20 bg-card p-[20px] sm:rounded-[26px]">
        <DialogHeader className="flex w-full flex-row items-center justify-between">
          <DialogTitle className="text-[18px] font-normal">Cancel proposal</DialogTitle>
          <img
            src="/assets/image/close.svg"
            alt="close"
            className="h-[24px] w-[24px] cursor-pointer transition-opacity hover:opacity-80"
            onClick={() => onOpenChange(false)}
          />
        </DialogHeader>
        <Separator className="my-0 bg-muted-foreground/40" />
        <div className="w-[360px] font-normal leading-normal">
          Once cancelled, a proposal can no longer be executed. Please note: Proposals can only be
          cancelled in certain scenarios.
        </div>
        <Separator className="my-0 bg-muted-foreground/40" />
        <div className="grid grid-cols-2 gap-[20px]">
          <Button className="rounded-[100px] border border-border/20 bg-card" variant="outline">
            Close
          </Button>
          <Button className="rounded-[100px]" variant="destructive">
            Cancel proposal{' '}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
