export type ProposalItem = {
  blockNumber: string;
  blockTimestamp: string;
  calldatas: string[];
  description: string;
  id: string;
  proposalId: string;
  proposer: string;
  signatures: string[];
  targets: string[];
  transactionHash: string;
  values: string[];
  voteEnd: string;
  voteStart: string;
};

export type ProposalResponse = {
  proposalCreateds: ProposalItem[];
};

export type ProposalByIdResponse = {
  proposalCreatedById: ProposalItem;
};
