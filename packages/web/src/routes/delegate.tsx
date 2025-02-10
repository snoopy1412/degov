import { createFileRoute } from '@tanstack/react-router'
import NotFound from '@/components/not-found'
import Error from '@/components/error'
import { Delegate } from '@/pages/Delegate'

export const Route = createFileRoute('/delegate')({
  component: () => <Delegate />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <Error />,
  validateSearch: (search) => {
    return search
  },
})
