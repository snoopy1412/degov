import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useNumberInput } from '@/hooks/useNumberInput';
import type { ProposalActionType } from '@/config/proposals';
import type { Address } from 'viem';
import { useConfig } from '@/hooks/useConfig';
import { TokenSelect } from '@/components/token-select';

export type TransferContentType = {
  recipient?: Address;
  amount?: string;
  snapshot?: string;
};

interface TransferPanelProps {
  index: number;
  content?: TransferContentType;
  onChange: (content: TransferContentType) => void;
  onReplace: (type: Omit<ProposalActionType, 'add'>, index: number) => void;
  onRemove: (index: number) => void;
}

export const TransferPanel = ({ index, content, onChange, onRemove }: TransferPanelProps) => {
  const daoConfig = useConfig();

  const handleChange = useCallback(
    ({ key, value }: { key: keyof TransferContentType; value: string }) => {
      onChange({
        ...content,
        [key]: value as Address | string
      });
    },
    [onChange, content]
  );

  const {
    value,
    handleChange: handleChangeAmount,
    handleBlur
    // handleReset,
    // handleChangeValue
  } = useNumberInput({
    maxDecimals: daoConfig?.tokenInfo?.decimals ?? 18,
    initialValue: '',
    onChange: (value) => handleChange({ key: 'amount', value })
  });

  return (
    <div className="flex flex-col gap-[20px] rounded-[14px] bg-card p-[20px]">
      <header className="flex items-center justify-between">
        <h4 className="text-[18px] font-semibold">Action #{index}</h4>
        <Button
          className="h-[30px] gap-[5px] rounded-[100px] border border-border bg-card"
          variant="outline"
          onClick={() => onRemove(index)}
        >
          <img src="/assets/image/proposal/close.svg" alt="plus" className="h-[16px] w-[16px]" />
          <span>Remove action</span>
        </Button>
      </header>
      <div className="mx-auto flex w-full flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <label className="text-[14px] text-foreground" htmlFor="recipient">
            Transfer to
          </label>
          <Input
            id="recipient"
            value={content?.recipient}
            onChange={(e) => handleChange({ key: 'recipient', value: e.target.value })}
            placeholder="Enter address"
            className="border-border/20 bg-card"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="text-[14px] text-foreground" htmlFor="title">
            Transfer amount
          </label>
          <div className="relative flex flex-col gap-[10px] rounded-[4px] border border-border/20 bg-card px-[10px] py-[20px]">
            <div className="flex items-center justify-between gap-[10px]">
              <input
                className={cn(
                  'w-full bg-transparent text-[36px] font-semibold tabular-nums text-foreground placeholder:text-foreground/50 focus-visible:outline-none'
                )}
                placeholder="0.000"
                type="number"
                value={value}
                onChange={handleChangeAmount}
                onBlur={handleBlur}
              />
              <TokenSelect />
            </div>
            <div className="flex items-center justify-between gap-[10px]">
              <span className="text-[14px] text-foreground/50">¥$ 44,654</span>
              <span className="text-[14px] text-foreground/50">Balance: 48M</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="text-[14px] text-foreground" htmlFor="snapshot">
            Snapshot URL
          </label>
          <Input
            id="snapshot"
            value={content?.snapshot}
            onChange={(e) => handleChange({ key: 'snapshot', value: e.target.value })}
            placeholder="Input"
            className="border-border/20 bg-card"
          />
        </div>
      </div>
    </div>
  );
};
