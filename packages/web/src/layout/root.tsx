import { Outlet } from '@tanstack/react-router';

const Root = () => {
  return (
    <div className="bg-secondary font-sans antialiased">
      <div className="flex min-h-dvh w-screen flex-col">
        <main className="flex flex-1 flex-col items-center justify-center">
          <div className="mx-auto flex h-full w-full items-center justify-center px-[var(--container-padding-x)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Root;
