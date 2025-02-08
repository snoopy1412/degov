import { Outlet } from '@tanstack/react-router';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Aside } from './aside';
import { Header } from './header';

const Root = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-screen w-screen bg-background font-sans antialiased">
        <aside className="w-[240px] border-r border-border bg-background">
          <Aside />
        </aside>
        <main className="flex flex-1 flex-col">
          <Header />
          <div className="mx-auto flex h-full w-full items-center justify-center px-[var(--container-padding-x)]">
            <Outlet />
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default Root;
