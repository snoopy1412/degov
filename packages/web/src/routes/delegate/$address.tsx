import NotFound from '@/components/not-found';
import { Delegate } from '@/pages/Delegate';
import { createFileRoute } from '@tanstack/react-router';
import Error from '@/components/error';

export const Route = createFileRoute('/delegate/$address')({
  component: () => <Delegate />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <Error />
});
