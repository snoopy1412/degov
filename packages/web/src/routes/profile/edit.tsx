import { createFileRoute } from '@tanstack/react-router';
import NotFound from '@/components/not-found';
import Error from '@/components/error';
import { Edit } from '@/pages/Profile/Edit';

export const Route = createFileRoute('/profile/edit')({
  component: () => <Edit />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <Error />
});
