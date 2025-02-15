import { Input } from '@/components/ui/input';

export function CallDataInputForm() {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-row gap-[10px]">
        <span className="flex-inline h-[37px] w-[200px] truncate rounded-[4px] border border-border bg-[#2E2E2E] p-[10px] text-[14px] text-foreground">
          delegatee
        </span>
        <Input
          placeholder="Input"
          className="h-[37px] border-border bg-card focus-visible:shadow-none focus-visible:ring-0"
        />
      </div>
      <div className="flex flex-row gap-[10px]">
        <span className="flex-inline h-[37px] w-[200px] truncate rounded-[4px] border border-border bg-[#2E2E2E] p-[10px] text-[14px] text-foreground">
          delegatee
        </span>
        <Input
          placeholder="Input"
          className="h-[37px] border-border bg-card focus-visible:shadow-none focus-visible:ring-0"
        />
      </div>
      <div className="flex flex-row gap-[10px]">
        <span className="flex-inline h-[37px] w-[200px] truncate rounded-[4px] border border-border bg-[#2E2E2E] p-[10px] text-[14px] text-foreground">
          delegatee
        </span>
        <Input
          placeholder="Input"
          className="h-[37px] border-border bg-card focus-visible:shadow-none focus-visible:ring-0"
        />
      </div>
    </div>
  );
}
