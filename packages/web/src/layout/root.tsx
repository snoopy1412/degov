import { Outlet } from '@tanstack/react-router';
import { Aside } from './aside';
import { Header } from './header';

const Root = () => {
  return (
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
  );
};

export default Root;
