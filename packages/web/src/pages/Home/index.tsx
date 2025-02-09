import { DaoHeader } from './dao-header';
import { Overview } from './overview';
import { Proposals } from './proposals';
export const HomePage = () => {
  return (
    <div className="flex flex-col gap-[30px] p-[30px]">
      <DaoHeader />
      <Overview />
      <Proposals />
    </div>
  );
};
