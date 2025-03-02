import { request } from "./client";
import * as Queries from "./queries";
import * as Types from "./types";

export const proposalService = {
  getAllProposals: async (
    endpoint: string,
    options: {
      limit?: number;
      offset?: number;
      orderBy?: string;
    } = {}
  ) => {
    const response = await request<Types.ProposalResponse>(
      endpoint,
      Queries.GET_ALL_PROPOSALS,
      options
    );
    return response?.proposalCreateds ?? [];
  },
  getProposalById: async (endpoint: string, id: string) => {
    const response = await request<Types.ProposalByIdResponse>(
      endpoint,
      Queries.GET_PROPOSAL_BY_ID,
      { id }
    );
    return response?.proposalCreatedById;
  },
};

export { Types };

export { Queries };
