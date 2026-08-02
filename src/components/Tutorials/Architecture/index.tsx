import { Box, Panel, SectionShell } from '../Shared'

const ArchitectureDiagram = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Panel label="Monolith" caption="One deployable, one database, one release cycle">
      <Box className="w-full h-20">Auth · Orders · Payments · Users</Box>
    </Panel>
    <Panel label="Microservices" caption="Independently deployed, each owns its own data">
      <div className="grid grid-cols-2 gap-2 w-full">
        <Box>Auth</Box>
        <Box>Orders</Box>
        <Box>Payments</Box>
        <Box>Users</Box>
      </div>
    </Panel>
  </div>
)

export const ArchitectureSection = () => (
  <SectionShell
    title="Monolith vs Microservices"
    paragraphs={[
      'A monolith is a single deployable unit — simple to build, test and deploy early on, but it couples every feature\'s scaling and release cycle together.',
      'Microservices split the system into independently deployable services owning their own data. This enables independent scaling and deploys, at the cost of operational complexity — network calls replace function calls, and you now need service discovery, distributed tracing, and to reason about partial failure.',
    ]}
    points={[
      'Start with a monolith unless you already know why you need microservices',
      'Split along clear business boundaries, not arbitrary technical layers',
    ]}
  >
    <ArchitectureDiagram />
  </SectionShell>
)
