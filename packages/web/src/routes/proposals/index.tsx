import NotFound from '@/components/not-found'
import { Proposals } from '@/pages/Proposals'
import { createFileRoute } from '@tanstack/react-router'
import Error from '@/components/error'

export const Route = createFileRoute('/proposals/')({
  component: () => <Proposals />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <Error />,
})
