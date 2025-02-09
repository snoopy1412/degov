import NotFound from '@/components/not-found';
import { Treasury } from '@/pages/Treasury';
import { createFileRoute } from '@tanstack/react-router';
import Error from '@/components/error';

export const Route = createFileRoute('/treasury')({
  component: () => <Treasury />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <Error />
});
