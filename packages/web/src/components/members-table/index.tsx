import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Empty } from "@/components/ui/empty";
import { Button } from "../ui/button";
import { AddressWithAvatar } from "../address-with-avatar";

export type Member = {
  rank: string;
  member: `0x${string}`;
  delegateStatement: string;
  votingPower: string;
};

interface MembersTableProps {
  caption?: string;
  data?: Member[];

  onDelegate?: (value: Member) => void;
}
export function MembersTable({ caption, onDelegate, data }: MembersTableProps) {
  return (
    <div className="rounded-[14px] bg-card p-[20px]">
      <Table>
        {!!data?.length && (
          <TableCaption>
            <Link
              href="/proposals"
              className="text-foreground transition-colors hover:text-foreground/80"
            >
              {caption || "View more"}
            </Link>
          </TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[160px] rounded-l-[14px] text-left">
              Rank
            </TableHead>
            <TableHead className="w-[260px] text-left">Member</TableHead>
            <TableHead>Delegate Statement</TableHead>
            <TableHead className="w-[200px]">Voting Power</TableHead>
            <TableHead className="w-[180px] rounded-r-[14px]">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((value) => (
            <TableRow key={value.rank}>
              <TableCell className="text-left">
                <span className="line-clamp-1" title={value.rank}>
                  {value.rank}
                </span>
              </TableCell>
              <TableCell className="text-left">
                <AddressWithAvatar address={value.member as `0x${string}`} />
              </TableCell>
              <TableCell className="text-left">
                <span className="line-clamp-1" title={value.delegateStatement}>
                  {value.delegateStatement}
                </span>
              </TableCell>
              <TableCell>{value.votingPower}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => {
                    onDelegate?.(value);
                  }}
                  className="h-[30px] rounded-[100px] border border-border bg-card p-[10px]"
                >
                  Delegate
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!data?.length && <Empty label="No Members" className="h-[400px]" />}
    </div>
  );
}
