import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/delegate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/delegate"!</div>
}
