interface VoteTotalProps {
  value: string;
  total: string;
}
export function VoteTotal({ value, total }: VoteTotalProps) {
  return (
    <div className="flex flex-col items-center gap-[4px]">
      <span className="text-[14px] font-normal text-foreground">{value}</span>
      <span className="text-[10px] text-muted-foreground">{total} Addresses</span>
    </div>
  );
}
