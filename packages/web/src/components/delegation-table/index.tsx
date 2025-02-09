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
import { Address } from './address';

const data = [
  {
    delegator: '0x3d6d656c1bf92f7028Ce4C352563E1C363C58ED5',
    delegationDate: 'May 20, 2015',
    votes: '104.35M'
  },
  {
    delegator: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    delegationDate: 'August 24, 2013',
    votes: '104.35M'
  }
];

interface DelegationTableProps {
  caption?: string;
}
export function DelegationTable({ caption }: DelegationTableProps) {
  return (
    <div className="rounded-[14px] bg-card p-[20px]">
      <Table>
        {!!data?.length && (
          <TableCaption>
            <Link
              to="/proposals"
              className="text-foreground transition-colors hover:text-foreground/80"
            >
              {caption || 'View more'}
            </Link>
          </TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[33.3%] rounded-l-[14px] text-left">Delegator</TableHead>
            <TableHead className="w-[33.3%]">Delegation Date</TableHead>
            <TableHead className="w-[33.3%] rounded-r-[14px] text-right">Votes</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((value) => (
            <TableRow key={value.delegator}>
              <TableCell className="text-left">
                <Address address={value.delegator as `0x${string}`} />
              </TableCell>
              <TableCell>{value.delegationDate}</TableCell>
              <TableCell className="text-right">{value.votes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!data?.length && (
        <Empty
          label={
            <span>
              You haven't received delegations from others, and you can delegate to yourself or
              others{' '}
              <a href="/delegate" className="font-semibold underline">
                here
              </a>
              .
            </span>
          }
          className="h-[400px]"
        />
      )}
    </div>
  );
}
