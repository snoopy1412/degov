import { Address } from 'viem';
import { Calldata } from './calldata-input-form';
import { ProposalContent, TransferContent } from './schema';

export type ProposalContentType = {
  [K in keyof ProposalContent]: {
    value?: string;
    error?: string;
  };
};

export type TransferContentType = {
  [K in keyof TransferContent]: {
    value?: Address | string;
    error?: string;
  };
};

export type CustomContentType = {
  target: {
    value: Address;
    error: string;
  };
  abiType: {
    value: string;
    error: string;
  };
  abiMethod: {
    value: string;
    error: string;
  };
  calldata: {
    value: Calldata[];
    error: string[];
  };
  value: {
    value: string;
    error: string;
  };
};
export interface ProposalAction {
  id: string;
  type: 'proposal';
  content: ProposalContentType;
}

export interface TransferAction {
  id: string;
  type: 'transfer';
  content: TransferContentType;
}

export interface CustomAction {
  id: string;
  type: 'custom';
  content: CustomContentType;
}

export interface AddAction {
  id: string;
  type: 'add';
}

export type Action = ProposalAction | TransferAction | CustomAction | AddAction;
