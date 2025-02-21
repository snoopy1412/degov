"use client";
import ClipboardIconButton from "@/components/clipboard-icon-button";
import { useConfig } from "@/hooks/useConfig";
import { TreasuryTable } from "@/components/treasury-table";

export default function Treasury() {
  const daoConfig = useConfig();
  return (
    <div className="flex flex-col gap-[20px] p-[30px]">
      <div className="flex items-center gap-[10px]">
        <h3 className="text-[18px] font-extrabold">TimeLock Assets</h3>
        <ClipboardIconButton
          text={daoConfig?.contracts?.timeLockContract}
          size={16}
        />
      </div>

      <div className="rounded-[14px] bg-card p-[20px]">
        <span className="text-[14px] leading-normal text-muted-foreground">
          Total Value
        </span>
        <p className="text-[36px] font-semibold leading-normal">5.43M USDT</p>
      </div>

      <div className="flex flex-col rounded-[14px] bg-card p-[20px]">
        <TreasuryTable />
      </div>
    </div>
  );
}
