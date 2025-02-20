import { v4 as uuidv4 } from 'uuid';
import { Address } from 'viem';
import type { CustomAction, ProposalAction, TransferAction } from './type';

export const generateProposalAction = (): ProposalAction => {
  return {
    id: uuidv4(),
    type: 'proposal',
    content: {
      title: {
        value: '',
        error: ''
      },
      markdown: {
        value: '\u200B',
        error: ''
      }
    }
  };
};

export const generateTransferAction = (): TransferAction => {
  return {
    id: uuidv4(),
    type: 'transfer',
    content: {
      recipient: {
        value: '' as Address,
        error: ''
      },
      amount: {
        value: '',
        error: ''
      }
    }
  };
};

export const generateCustomAction = (): CustomAction => {
  return {
    id: uuidv4(),
    type: 'custom',
    content: {
      target: {
        value: '' as Address,
        error: ''
      },
      abiType: {
        value: '',
        error: ''
      },
      abiMethod: {
        value: '',
        error: ''
      },
      calldata: {
        value: [],
        error: []
      },
      value: {
        value: '',
        error: ''
      }
    }
  };
};
