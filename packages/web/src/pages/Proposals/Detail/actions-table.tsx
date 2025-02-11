import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Empty } from '@/components/ui/empty';
import { PROPOSAL_ACTIONS, type ProposalActionType } from '@/config/proposals';
import { formatShortAddress } from '@/utils/address';
import { useConfig } from '@/hooks/useConfig';
import type { Address } from 'viem';
export type Result = {
  type: ProposalActionType;
  addressData: Address;
  details: string;
};

const data: Result[] = [
  {
    type: 'proposal',
    addressData: '0x1234567890123456789012345678901234567890',
    details: 'Proposal'
  },
  {
    type: 'transfer',
    addressData: '0x1234567890123456789012345678901234567890',
    details: 'Transfer'
  }
];

export function ActionsTable() {
  const daoConfig = useConfig();

  return (
    <div className="rounded-[14px] bg-card p-[20px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3 rounded-l-[14px] text-left">Type</TableHead>
            <TableHead className="w-1/3 text-left">Address Data</TableHead>
            <TableHead className="w-1/3 rounded-r-[14px] text-left">Details</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((value) => (
            <TableRow key={value.type + '-' + value.addressData}>
              <TableCell className="text-left">
                <div className="flex items-center gap-[10px]">
                  <img
                    src={PROPOSAL_ACTIONS[value.type]}
                    alt={value.type}
                    className="h-[24px] w-[24px] rounded-full"
                  />
                  <span className="text-[14px] capitalize">{value.type}</span>
                </div>
              </TableCell>

              <TableCell className="text-left">
                <a
                  href={`${daoConfig?.networkInfo?.explorer?.url}/address/${value.addressData}`}
                  className="flex items-center gap-[10px] transition-opacity hover:opacity-80"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{formatShortAddress(value.addressData)}</span>
                  <img src="/assets/image/external-link.svg" alt="external-link" />
                </a>
              </TableCell>

              <TableCell className="text-left">{value.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!data?.length && <Empty label="No Addresses" className="h-[400px]" />}
    </div>
  );
}
