import { createFileRoute } from '@tanstack/react-router';
import Error from '@/components/error';
import NotFound from '@/components/not-found';
import { NewProposal } from '@/pages/Proposals/New';

export const Route = createFileRoute('/proposals/new')({
  component: () => <NewProposal />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <Error />
});
