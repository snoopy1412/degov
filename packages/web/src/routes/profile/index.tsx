import { createFileRoute } from '@tanstack/react-router';
import NotFound from '@/components/not-found';
import Error from '@/components/error';
import { Profile } from '@/pages/Profile';

export const Route = createFileRoute('/profile/')({
  component: () => <Profile />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <Error />
});
