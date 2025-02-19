import type { ProposalActionType } from '@/config/proposals';
import type { ProposalContentType } from './schema';
import type { TransferContentType } from './transfer-panel';
import type { CustomContentType } from './custom-panel';

export interface Action {
  id: string;
  type: ProposalActionType;
  content: ProposalContentType | TransferContentType | CustomContentType;
}
