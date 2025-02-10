import { createFileRoute } from '@tanstack/react-router';
import Error from '@/components/error';
import NotFound from '@/components/not-found';
import { Detail } from '@/pages/Proposals/Detail';

export const Route = createFileRoute('/proposals/$address')({
  component: () => <Detail />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <Error />
});
