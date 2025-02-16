import { Fragment, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PROPOSAL_ACTIONS } from '@/config/proposals';
import { useConfig } from '@/hooks/useConfig';

interface Action {
  type: string;
  address: string;
  details: string;
  params?: {
    name: string;
    value: string;
  }[];
  signature?: string;
  calldata?: {
    [key: string]: string;
  };
  target?: string;
  value?: string;
}

interface ActionsPanelProps {
  actions: Action[];
}

export const ActionsPanel = ({ actions }: ActionsPanelProps) => {
  const [tab, setTab] = useState<'raw' | 'summary'>('summary');
  const [openParams, setOpenParams] = useState<number[]>([]);

  const toggleParams = (index: number) => {
    setOpenParams((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const RawView = () => {
    const daoConfig = useConfig();
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3 rounded-l-[14px] px-[10px] text-left">Type</TableHead>
            <TableHead className="w-1/3 px-[10px] text-left">Address Data</TableHead>
            <TableHead className="w-1/3 rounded-r-[14px] px-[10px] text-left">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_tr:has(+tr[data-expanded])]:border-0">
          {actions.map((action, index) => (
            <Fragment key={index}>
              <TableRow>
                <TableCell className="w-1/3 text-left">
                  {' '}
                  <div className="flex items-center gap-[10px]">
                    <img
                      src={PROPOSAL_ACTIONS[action.type as keyof typeof PROPOSAL_ACTIONS]}
                      alt={action.type}
                      className="h-[24px] w-[24px] rounded-full"
                    />
                    <span className="text-[14px] capitalize">{action.type}</span>
                  </div>
                </TableCell>
                <TableCell className="w-1/3 text-left">
                  <a
                    href={`${daoConfig?.networkInfo?.explorer?.url}/address/${action.address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-[5px] hover:underline"
                  >
                    {action.address}
                    <img src="/assets/image/external-link.svg" alt="external-link" />
                  </a>
                </TableCell>
                <TableCell className="w-1/3 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <span>{action.details}</span>
                    {action.params && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleParams(index)}
                        className="text-[14px] text-foreground/40"
                      >
                        {action.params.length} params
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform duration-200',
                            openParams.includes(index) && 'rotate-180'
                          )}
                        />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
              {action.params && openParams.includes(index) && (
                <TableRow data-expanded className="border-t-0">
                  <TableCell colSpan={3} className="pt-0">
                    {action.params.map((param, pIndex) => (
                      <div key={pIndex} className="flex gap-2">
                        <span className="font-medium">{param.name}:</span>
                        <span>{param.value}</span>
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    );
  };

  const SummaryView = () => (
    <div className="space-y-[20px]">
      {actions.map((action, index) => (
        <div key={index}>
          <h3 className="mb-[10px] text-[18px] font-semibold">Function {index + 1}</h3>

          <div className="space-y-[20px] rounded-[4px] border p-[20px]">
            <div>
              <h4 className="text-[14px] font-normal text-muted-foreground">Signature:</h4>
              <p className="font-mono font-semibold">{action.signature}</p>
            </div>

            {action.calldata && (
              <div>
                <h4 className="text-[14px] font-normal text-muted-foreground">Calldata:</h4>
                {Object.entries(action.calldata).map(([key, value], cIndex) => (
                  <div key={cIndex} className="font-mono font-semibold">
                    {key}: {value}
                  </div>
                ))}
              </div>
            )}

            {action.target && (
              <div>
                <h4 className="text-[14px] font-normal text-muted-foreground">Target:</h4>
                <p className="font-mono font-semibold">{action.target}</p>
              </div>
            )}

            {action.value && (
              <div>
                <h4 className="text-[14px] font-normal text-muted-foreground">Value:</h4>
                <p className="font-mono font-semibold">{action.value}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    return () => {
      setOpenParams([]);
    };
  }, []);

  return (
    <div className="space-y-[20px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[26px] font-semibold">Actions</h2>
        {tab === 'summary' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTab('raw')}
            className="rounded-full border-border bg-card"
          >
            Raw
          </Button>
        )}
        {tab === 'raw' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTab('summary')}
            className="rounded-full border-border bg-card"
          >
            Summary
          </Button>
        )}
      </div>

      {tab === 'summary' && <RawView />}
      {tab === 'raw' && <SummaryView />}
    </div>
  );
};
