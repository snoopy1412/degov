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
import type { Address } from 'viem';
import { AddressWithAvatar } from '@/components/address-with-avatar';

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
                <AddressWithAvatar address={value.address} avatarSize={30} />
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
