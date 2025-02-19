import { Outlet } from '@tanstack/react-router';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Aside } from './aside';
import { Header } from './header';
import { useBlockNumber } from 'wagmi';
import { useIndexerBlockNumber } from '@/hooks/useIndexerBlockNumber';
import { useIndexerStatus } from '@/hooks/useIndexerStatus';
import { useEffect } from 'react';
import { useGovernanceToken } from '@/hooks/useGovernanceToken';
import { useVotingPower } from '@/hooks/useVotingPower';
import { useGovernanceParams } from '@/hooks/useGovernaceParams';

const Root = () => {
  // get current block number
  const { data: blockNumber } = useBlockNumber();
  // // get indexer block number
  const { data: indexerBlockNumber } = useIndexerBlockNumber();

  // // get governance token info
  // const { data: governanceTokenInfo } = useGovernanceToken();
  // // get voting power
  // const { data: votingPower } = useVotingPower();
  // // get governance params
  const { data: governanceParams, error: governanceParamsError } = useGovernanceParams();

  // console.log('governanceTokenInfo', governanceTokenInfo);
  // console.log('votingPower', votingPower);
  // console.log('governanceParams', governanceParams);
  // console.log('governanceParamsError', governanceParamsError);
  // get indexer status
  const { updateStatus } = useIndexerStatus();

  useEffect(() => {
    if (blockNumber && indexerBlockNumber) {
      updateStatus(Number(blockNumber), Number(indexerBlockNumber));
    }
  }, [blockNumber, indexerBlockNumber, updateStatus]);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex min-h-screen overflow-hidden bg-background font-sans antialiased">
        <aside className="h-auto w-[240px] flex-shrink-0 border-r border-border bg-background">
          <Aside />
        </aside>
        <main className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
          <Header />
          <div className="mx-auto w-full flex-1">
            <Outlet />
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default Root;
