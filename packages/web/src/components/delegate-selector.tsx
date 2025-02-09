import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { Separator } from './ui/separator';

export function DelegateSelector() {
  const [open, setOpen] = useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[400px] rounded-[26px] border-border/20 bg-card p-[20px] sm:rounded-[26px]">
        <DialogHeader className="flex w-full flex-row items-center justify-between">
          <DialogTitle className="text-[18px] font-extrabold">Delegate</DialogTitle>
          <img src="/assets/image/close.svg" alt="close" className="h-[24px] w-[24px]" />
        </DialogHeader>
        <Separator className="my-0 bg-muted-foreground/40" />
        <div className="flex flex-col gap-[20px]">
          <Button className="w-full rounded-[100px] border-border bg-card" variant="outline">
            Myself
          </Button>
          <Button className="w-full rounded-[100px] border-border bg-card" variant="outline">
            Someone else
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
