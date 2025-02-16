import { createFileRoute } from '@tanstack/react-router';
import NotFound from '@/components/not-found';
import Error from '@/components/error';
import { Detail } from '@/pages/Profile/detail';

export const Route = createFileRoute('/profile/$address')({
  component: () => <Detail />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <Error />
});
