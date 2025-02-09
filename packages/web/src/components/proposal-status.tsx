import { cn } from '@/lib/utils';

interface ProposalStatusProps {
  status: 'pending' | 'active' | 'succeeded' | 'executed' | 'defeated' | 'canceled';
}

export function ProposalStatus({ status }: ProposalStatusProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-[14px] px-[18px] py-[4px] text-[14px] font-normal',
        status === 'pending' && 'bg-pending/10 text-pending',
        status === 'active' && 'bg-active/10 text-active',
        status === 'succeeded' && 'bg-succeeded/10 text-succeeded',
        status === 'executed' && 'bg-executed/10 text-executed',
        status === 'defeated' && 'bg-defeated/10 text-defeated',
        status === 'canceled' && 'bg-canceled/10 text-canceled'
      )}
    >
      {status}
    </span>
  );
}
