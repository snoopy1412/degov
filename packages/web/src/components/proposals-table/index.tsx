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
import { ProposalStatus } from '../proposal-status';
import { VotePercentage } from './vote-percentage';
import { VoteTotal } from './vote-total';
import { Empty } from '@/components/ui/empty';

const data = [
  {
    proposal: '[Non-Constitutional] DCDAO Delegate Incentive Program',
    time: 'Jan 7th, 2025',
    status: <ProposalStatus status="canceled" />,
    votesFor: <VotePercentage status="for" value="1.11B" />,
    votesAgainst: <VotePercentage status="against" value="1.11B" />,
    totalVotes: <VoteTotal value="1.11B" total="7960" />
  },
  {
    proposal:
      'Enhancing Multichain Governance: Upgrading RARI Governance Token on ArbitrumEnhancing Multichain Governance: Upgrading RARI Governance Token on Arbitrum',
    time: 'Jan 7th, 2025',
    status: <ProposalStatus status="pending" />,
    votesFor: <VotePercentage status="for" value="1.11B" />,
    votesAgainst: <VotePercentage status="against" value="1.11B" />,
    totalVotes: <VoteTotal value="1.11B" total="7960" />
  }
];

interface ProposalsTableProps {
  caption?: string;
}
export function ProposalsTable({ caption }: ProposalsTableProps) {
  return (
    <div className="rounded-[14px] bg-card p-[20px]">
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
            <TableHead className="w-[400px] rounded-l-[14px] text-left">Proposal</TableHead>
            <TableHead className="w-[200px]">Time</TableHead>
            <TableHead className="w-[200px]">Status</TableHead>
            <TableHead className="w-[200px]">Votes for</TableHead>
            <TableHead className="w-[200px]">Votes against</TableHead>
            <TableHead className="w-[200px] rounded-r-[14px]">Total votes</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((value) => (
            <TableRow key={value.proposal}>
              <TableCell className="text-left">
                <span className="line-clamp-1" title={value.proposal}>
                  {value.proposal}
                </span>
              </TableCell>
              <TableCell>{value.time}</TableCell>
              <TableCell>{value.status}</TableCell>
              <TableCell>{value.votesFor}</TableCell>
              <TableCell>{value.votesAgainst}</TableCell>
              <TableCell>{value.totalVotes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!data?.length && <Empty label="No proposals" className="h-[400px]" />}
    </div>
  );
}
