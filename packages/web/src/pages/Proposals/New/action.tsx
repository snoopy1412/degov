import { PROPOSAL_ACTIONS, type ProposalActionType } from '@/config/proposals';
import { cn } from '@/lib/utils';
interface NewProposalActionProps {
  type: Omit<ProposalActionType, 'add'>;
  onSwitch?: (type: Omit<ProposalActionType, 'add'>) => void;
  active?: boolean;
}

export const NewProposalAction = ({ type, onSwitch, active }: NewProposalActionProps) => {
  if (type === 'proposal') {
    return (
      <div
        className={cn(
          'flex cursor-pointer items-center gap-[10px] rounded-[14px] border border-border/20 bg-card px-[20px] py-[15px] transition-opacity hover:opacity-80',
          active && 'border-border'
        )}
        onClick={() => onSwitch?.('proposal')}
      >
        <img src={PROPOSAL_ACTIONS['proposal']} alt="proposal" />
        <span className="text-[14px] font-normal text-foreground">Proposal</span>
      </div>
    );
  }
  if (type === 'transfer') {
    return (
      <div
        className={cn(
          'flex cursor-pointer items-center gap-[10px] rounded-[14px] border border-border/20 bg-card px-[20px] py-[15px] transition-opacity hover:opacity-80',
          active && 'border-border'
        )}
        onClick={() => onSwitch?.('transfer')}
      >
        <img src={PROPOSAL_ACTIONS['transfer']} alt="transfer" />
        <span className="text-[14px] font-normal text-foreground">Transfer</span>
      </div>
    );
  }
  if (type === 'custom') {
    return (
      <div
        className={cn(
          'flex cursor-pointer items-center gap-[10px] rounded-[14px] border border-border/20 bg-card px-[20px] py-[15px] transition-opacity hover:opacity-80',
          active && 'border-border'
        )}
        onClick={() => onSwitch?.('custom')}
      >
        <img src={PROPOSAL_ACTIONS['custom']} alt="custom" />
        <span className="text-[14px] font-normal text-foreground">Custom</span>
      </div>
    );
  }
  if (type === 'preview') {
    return (
      <div
        className={cn(
          'flex cursor-pointer items-center gap-[10px] rounded-[14px] border border-border/20 bg-card px-[20px] py-[15px] transition-opacity hover:opacity-80',
          active && 'border-border'
        )}
        onClick={() => onSwitch?.('preview')}
      >
        <img src={PROPOSAL_ACTIONS['preview']} alt="preview" />
        <span className="text-[14px] font-normal text-foreground">Preview</span>
      </div>
    );
  }
  return null;
};
