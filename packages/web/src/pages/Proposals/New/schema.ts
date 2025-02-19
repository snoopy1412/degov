import { z } from 'zod';
import { isAddress } from 'viem';

export const proposalSchema = z.object({
  title: z.string().min(1, 'Title is required').max(80, 'Title must be less than 80 characters'),
  markdown: z
    .string()
    .min(1, 'Description is required')
    .refine((val) => val !== '\u200B', 'Description is required')
});

export type ProposalContent = z.infer<typeof proposalSchema>;

export type ProposalContentType = {
  [K in keyof ProposalContent]: {
    value?: string;
    error?: string;
  };
};

export const transferSchema = z.object({
  recipient: z.string().refine((val) => isAddress(val), 'Must be a valid eth address'),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Amount must be greater than 0')
});

export type TransferContent = z.infer<typeof transferSchema>;

export type TransferContentType = {
  [K in keyof TransferContent]: {
    value?: string;
    error?: string;
  };
};
