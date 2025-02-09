import { DelegationTable } from '@/components/delegation-table';

export function ReceivedDelegations() {
  return (
    <div className="flex flex-col gap-[20px]">
      <h3 className="text-[18px] font-semibold">Overview</h3>
      <DelegationTable />
    </div>
  );
}
