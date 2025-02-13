export type ProposalActionType = 'proposal' | 'transfer' | 'custom' | 'preview' | 'add';

export interface ProposalAction {
  type: ProposalActionType;
  label: string;
  icon: string;
}

export const PROPOSAL_ACTIONS = {
  proposal: '/assets/image/proposals-outline.svg',
  transfer: '/assets/image/transfer-outline.svg',
  custom: '/assets/image/custom-outline.svg',
  preview: '/assets/image/preview-outline.svg'
} as const;
