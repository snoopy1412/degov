import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function Empty({ className, label }: { className?: string; label?: ReactNode }) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-[20px]', className)}>
      <img src="/assets/image/empty.svg" alt="empty" className="size-[60px]" />
      <div className="max-w-[320px] text-balance text-center text-[12px] font-normal text-foreground">
        {label || 'No data'}
      </div>
    </div>
  );
}
