import { createFileRoute } from '@tanstack/react-router';
import NotFound from '@/components/not-found';
import Error from '@/components/error';

export const Route = createFileRoute('/')({
  component: () => <div>Hello</div>,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <Error />
});
