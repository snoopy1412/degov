import type { CustomContent, ProposalContent, TransferContent } from "./schema";

export interface ProposalAction {
  id: string;
  type: "proposal";
  content: Partial<ProposalContent>;
}

export interface TransferAction {
  id: string;
  type: "transfer";
  content: TransferContent;
}

export interface CustomAction {
  id: string;
  type: "custom";
  content: CustomContent;
}

export interface AddAction {
  id: string;
  type: "add";
}

export type Action = ProposalAction | TransferAction | CustomAction | AddAction;
