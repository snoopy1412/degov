import { createFileRoute } from '@tanstack/react-router';
import { Members } from '@/pages/Members';
import NotFound from '@/components/not-found';
import Error from '@/components/error';

export const Route = createFileRoute('/members')({
  component: () => <Members />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <Error />
});
