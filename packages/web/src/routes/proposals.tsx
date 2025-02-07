import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/proposals')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/proposals"!</div>
}
