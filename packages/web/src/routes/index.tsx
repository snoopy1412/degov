import { createFileRoute } from '@tanstack/react-router';
import NotFound from '@/components/not-found';
import Error from '@/components/error';
import { HomePage } from '@/pages/Home';

export const Route = createFileRoute('/')({
  component: () => <HomePage />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <Error />
});
