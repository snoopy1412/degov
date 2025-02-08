import { ConnectButton } from '@/components/connect-button';
import { Search } from 'lucide-react';

export const Header = () => {
  return (
    <header className="w-full border-b border-border bg-background px-[30px] py-[20px]">
      <div className="flex h-[36px] items-center justify-between">
        <div className="flex h-[36px] w-[338px] items-center gap-[13px] rounded-[20px] border border-border bg-card px-[17px]">
          <Search className="h-[15px] w-[15px] text-white/50" />
          <input
            placeholder="Search proposals on DeGov"
            className="h-full flex-1 appearance-none bg-transparent outline-none"
          />
        </div>

        <ConnectButton />
      </div>
    </header>
  );
};
