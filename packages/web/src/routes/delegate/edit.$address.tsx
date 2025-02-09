import { createFileRoute } from '@tanstack/react-router'
import NotFound from '@/components/not-found'
import Error from '@/components/error'
import { Edit } from '@/pages/Delegate/Edit'

export const Route = createFileRoute('/delegate/edit/$address')({
  component: () => <Edit />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <Error />,
})
