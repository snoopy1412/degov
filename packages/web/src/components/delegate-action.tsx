import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { Separator } from './ui/separator';
import { AddressAvatar } from './address-avatar';
import { AddressResolver } from './address-resolver';
import type { Address } from 'viem';

interface DelegateActionProps {
  address: Address;
}

export function DelegateAction({ address }: DelegateActionProps) {
  const [open, setOpen] = useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[400px] rounded-[26px] border-border/20 bg-card p-[20px] sm:rounded-[26px]">
        <DialogHeader className="flex w-full flex-row items-center justify-between">
          <DialogTitle className="text-[18px] font-extrabold">Delegate</DialogTitle>
          <img src="/assets/image/close.svg" alt="close" className="h-[24px] w-[24px]" />
        </DialogHeader>
        <Separator className="my-0 bg-muted-foreground/40" />
        <div className="flex h-[87px] w-[360px] items-center justify-center gap-[20px] rounded-[10px] bg-secondary p-[20px]">
          <AddressAvatar
            address={address ?? '0x0000000000000000000000000000000000000000'}
            size={40}
          />
          <AddressResolver
            address={address ?? '0x0000000000000000000000000000000000000000'}
            showShortAddress
          >
            {(value) => <span className="text-[18px] font-semibold">{value}</span>}
          </AddressResolver>
        </div>
        <Separator className="my-0 bg-muted-foreground/40" />
        <div className="flex flex-col gap-[20px]">
          <Button className="w-full rounded-[100px]">Delegate votes 0 RING</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
