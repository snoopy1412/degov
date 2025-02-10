import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Link } from '@tanstack/react-router';
import { Empty } from '@/components/ui/empty';
import { AddressAvatar } from '@/components/address-avatar';
import { AddressResolver } from '@/components/address-resolver';
import type { Address } from 'viem';

export type Result = {
  address: Address;
  vote: string;
};

interface ResultTableProps {
  caption?: string;
  data?: Result[];
}
export function ResultTable({ caption, data }: ResultTableProps) {
  return (
    <>
      <Table>
        {!!data?.length && (
          <TableCaption>
            <Link
              to="/proposals"
              className="text-foreground transition-colors hover:text-foreground/80"
            >
              {caption || 'View all'}
            </Link>
          </TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2 rounded-l-[14px] text-left">4816 addresses</TableHead>
            <TableHead className="w-1/2 rounded-r-[14px] text-right">167.79M votes</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((value) => (
            <TableRow key={value.address}>
              <TableCell className="text-left">
                <span className="flex items-center gap-[10px]">
                  <AddressAvatar address={value.address} size={30} />
                  <AddressResolver address={value.address} showShortAddress>
                    {(ensName) => (
                      <span className="line-clamp-1" title={value.address}>
                        {ensName}
                      </span>
                    )}
                  </AddressResolver>
                </span>
              </TableCell>

              <TableCell className="text-right">104.35M</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!data?.length && <Empty label="No Addresses" className="h-[400px]" />}
    </>
  );
}
