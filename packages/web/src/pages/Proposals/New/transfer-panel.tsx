import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ProposalActionType } from '@/config/proposals';
import type { Address } from 'viem';

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
  const handleChange = useCallback(
    ({ key, value }: { key: keyof TransferContentType; value: string }) => {
      onChange({
        ...content,
        [key]: value as Address | string
      });
    },
    [onChange, content]
  );
  return (
    <div className="flex flex-col gap-[20px] rounded-[14px] bg-card p-[20px]">
      <header className="flex items-center justify-between">
        <h4 className="text-[18px] font-semibold">Action #{index}</h4>
        <Button
          className="h-[30px] gap-[5px] rounded-[100px] border border-border/20 bg-card"
          variant="outline"
          onClick={() => onRemove(index)}
        >
          <img src="/assets/image/proposal/close.svg" alt="plus" className="h-[16px] w-[16px]" />
          <span>Remove action</span>
        </Button>
      </header>
      <div className="mx-auto flex w-full max-w-[850px] flex-col gap-[20px]">
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
        {/* <div className="flex flex-col gap-[10px]">
          <label className="text-[14px] text-foreground" htmlFor="title">
            Title
          </label>
          <Input
            id="title"
            value={content.title}
            onChange={(e) => handleChange({ key: 'title', value: e.target.value })}
            placeholder="Enter the title of your proposal"
            className="border-border/20 bg-card"
          />
        </div> */}
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
