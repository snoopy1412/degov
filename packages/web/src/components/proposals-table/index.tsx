import Link from "next/link";

import { Empty } from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ProposalStatus } from "../proposal-status";

import { VotePercentage } from "./vote-percentage";
import { VoteTotal } from "./vote-total";


// Move raw data to separate interface/type
interface ProposalData {
  proposal: string;
  id: string;
  time: string;
  status: "canceled" | "pending"; // Use string type instead of component
  votesFor: string;
  votesAgainst: string;
  totalVotes: {
    value: string;
    total: string;
  };
}

const data: ProposalData[] = [
  {
    proposal: "[Non-Constitutional] DCDAO Delegate Incentive Program",
    id: "39167772932143723025658918622015993797875961063645251007065064214127031243174",
    time: "Jan 7th, 2025",
    status: "canceled",
    votesFor: "1.11B",
    votesAgainst: "1.11B",
    totalVotes: {
      value: "1.11B",
      total: "7960",
    },
  },
  {
    proposal:
      "Enhancing Multichain Governance: Upgrading RARI Governance Token on ArbitrumEnhancing Multichain Governance: Upgrading RARI Governance Token on Arbitrum",
    id: "39167772932143723025658918622015993797875961063645251007065064214127031243175",
    time: "Jan 7th, 2025",
    status: "pending",
    votesFor: "1.11B",
    votesAgainst: "1.11B",
    totalVotes: {
      value: "1.11B",
      total: "7960",
    },
  },
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
              href="/proposals"
              className="text-foreground transition-colors hover:text-foreground/80"
            >
              {caption || "View all"}
            </Link>
          </TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px] rounded-l-[14px] text-left">
              Proposal
            </TableHead>
            <TableHead className="w-[200px]">Time</TableHead>
            <TableHead className="w-[200px]">Status</TableHead>
            <TableHead className="w-[200px]">Votes for</TableHead>
            <TableHead className="w-[200px]">Votes against</TableHead>
            <TableHead className="w-[200px] rounded-r-[14px]">
              Total votes
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((value) => (
            <TableRow key={value.proposal}>
              <TableCell className="text-left">
                <Link
                  className="line-clamp-1 hover:underline"
                  title={value.proposal}
                  href={`/proposals/${value.id}`}
                >
                  {value.proposal}
                </Link>
              </TableCell>
              <TableCell>{value.time}</TableCell>
              <TableCell>
                <ProposalStatus status={value.status} />
              </TableCell>
              <TableCell>
                <VotePercentage status="for" value={value.votesFor} />
              </TableCell>
              <TableCell>
                <VotePercentage status="against" value={value.votesAgainst} />
              </TableCell>
              <TableCell>
                <VoteTotal
                  value={value.totalVotes.value}
                  total={value.totalVotes.total}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!data?.length && <Empty label="No proposals" className="h-[400px]" />}
    </div>
  );
}
