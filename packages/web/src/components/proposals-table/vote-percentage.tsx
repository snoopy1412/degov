import { Progress } from '@/components/ui/progress';
import { VOTE_CONFIG } from '@/config/vote';

interface VotePercentageProps {
  status: 'for' | 'against' | 'abstain';
  value: string;
}
export function VotePercentage({ status, value }: VotePercentageProps) {
  return (
    <div className="flex flex-col items-center gap-[4px]">
      <span className="text-[14px] font-normal text-foreground">{value}</span>
      <Progress
        value={50}
        indicatorClassName={VOTE_CONFIG.colors[status]}
        className="h-[4px] w-[60px]"
      />
    </div>
  );
}
