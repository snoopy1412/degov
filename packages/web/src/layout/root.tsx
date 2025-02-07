import { Outlet } from '@tanstack/react-router';
import { Sider } from './sider';

const Root = () => {
  return (
    <div className="flex min-h-dvh w-screen flex-col bg-secondary font-sans antialiased">
      <Sider />
      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="mx-auto flex h-full w-full items-center justify-center px-[var(--container-padding-x)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Root;
