"use client";
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
import { useMemo } from "react";
import { useConfig } from "@/hooks/useConfig";
import { isEmpty } from "lodash-es";
import { Asset } from "./asset";
interface TreasuryTableProps {
  caption?: string;
}
export function TreasuryTable({ caption }: TreasuryTableProps) {
  const daoConfig = useConfig();
  const data = useMemo(() => {
    if (!daoConfig?.timeLockAssets || isEmpty(daoConfig?.timeLockAssets))
      return [];
    return Object.entries(daoConfig?.timeLockAssets || {}).map(([, value]) => ({
      ...value,
    }));
  }, [daoConfig]);

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
            <TableHead className="rounded-l-[14px] text-left">Asset</TableHead>
            <TableHead className="w-[500px]">Balance</TableHead>
            <TableHead className="w-[200px] rounded-r-[14px] text-right">
              Value (24h change)
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((value) => (
            <TableRow key={value.symbol}>
              <TableCell className="text-left">
                <Asset
                  asset={value}
                  explorer={daoConfig?.network?.explorer?.url as string}
                />
              </TableCell>
              <TableCell>{`514K ${value.symbol}`}</TableCell>
              <TableCell className="text-right">1.95B USD</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!data?.length && (
        <Empty
          label="The types of assets for the DAO timelock are configured in the service configuration file during initial setup. If no assets are displayed here, you may need to update your configuration file and restart the service."
          className="h-[400px]"
        />
      )}
    </div>
  );
}
