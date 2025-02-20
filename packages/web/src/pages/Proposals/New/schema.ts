import { isAddress } from 'viem';
import { z } from 'zod';

export const proposalSchema = z.object({
  title: z.string().min(1, 'Title is required').max(80, 'Title must be less than 80 characters'),
  markdown: z
    .string()
    .min(1, 'Description is required')
    .refine((val) => val !== '\u200B', 'Description is required')
});

export type ProposalContent = z.infer<typeof proposalSchema>;

export const transferSchema = z.object({
  recipient: z.string().refine((val) => isAddress(val), 'Must be a valid eth address'),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Amount must be greater than 0')
});

export type TransferContent = z.infer<typeof transferSchema>;
