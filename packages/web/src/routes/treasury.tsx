import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/treasury')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/treasury"!</div>
}
