import { RouterProvider, createRouter } from '@tanstack/react-router';
import { DAppProvider } from './providers/dapp.provider';
import { ConfigProvider } from './providers/config.provider';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
function App() {
  return (
    <ConfigProvider>
      <DAppProvider>
        <RouterProvider router={router} />
      </DAppProvider>
    </ConfigProvider>
  );
}

export default App;
