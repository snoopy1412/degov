import { Button } from '@/components/ui/button';
import { NewProposalAction } from './action';
import type { ProposalActionType } from '@/config/proposals';

interface ReplacePanelProps {
  index: number;
  onReplace: (type: Omit<ProposalActionType, 'add'>, index: number) => void;
  onRemove: (index: number) => void;
}

export const ReplacePanel = ({ index, onReplace, onRemove }: ReplacePanelProps) => {
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
        <NewProposalAction
          type="transfer"
          onSwitch={(type) => onReplace(type as Omit<ProposalActionType, 'add'>, index)}
        />
        <NewProposalAction
          type="custom"
          onSwitch={(type) => onReplace(type as Omit<ProposalActionType, 'add'>, index)}
        />
      </div>
    </div>
  );
};
