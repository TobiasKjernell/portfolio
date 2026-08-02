import { Arrow, Box, Panel, ProsConsCard, SectionShell } from '../Shared'

const ScalingProsCons = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <ProsConsCard
      title="Vertical Scaling"
      pros={[
        'No code or architecture changes required',
        'Simpler to reason about — one machine, one deployment',
        'No need for distributed state or session handling',
      ]}
      cons={[
        'Hard ceiling — limited by the biggest instance size available',
        'Single point of failure — that one machine going down takes everything with it',
        'Usually needs downtime to resize (reboot or migrate)',
        'Cost climbs disproportionately at the high end',
      ]}
    />
    <ProsConsCard
      title="Horizontal Scaling"
      pros={[
        'Near-limitless scale — just add more machines',
        'Built-in redundancy — one instance failing doesn\'t take the system down',
        'Enables zero-downtime, rolling deploys',
        'Cost scales roughly linearly with commodity hardware',
      ]}
      cons={[
        'Requires statelessness or externalized state (sessions, cache, etc.)',
        'More moving parts — load balancing, service discovery, monitoring across many nodes',
        'Data consistency gets harder across distributed nodes',
        'Higher baseline complexity, even at small scale',
      ]}
    />
  </div>
)

const ScalingDiagram = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Panel label="Vertical Scaling" caption="One machine gets bigger over time">
      <div className="flex flex-col items-center gap-2 py-2">
        <Box className="w-20 h-10">4 vCPU</Box>
        <Arrow />
        <Box className="w-28 h-14 text-xs">8 vCPU</Box>
        <Arrow />
        <Box className="w-36 h-18 text-sm">16 vCPU</Box>
      </div>
    </Panel>

    <Panel label="Horizontal Scaling" caption="Many same-size machines, same time">
      <div className="flex flex-col items-center gap-2 py-2 w-full">
        <Box>Load Balancer</Box>
        <div className="grid grid-cols-3 gap-4 w-full max-w-[220px] text-center gold-text text-lg leading-none">
          <span>↓</span>
          <span>↓</span>
          <span>↓</span>
        </div>
        <div className="grid grid-cols-3 gap-2 w-full max-w-[220px]">
          {['A', 'B', 'C'].map((label) => (
            <Box key={label} className="h-12">
              Server {label}
            </Box>
          ))}
        </div>
      </div>
    </Panel>
  </div>
)

export const ScalabilitySection = () => (
  <SectionShell
    title="Scalability: Vertical vs Horizontal"
    paragraphs={[
      'Vertical scaling means making a single machine more powerful (more CPU, RAM, faster disks). It is simple — no code changes — but has a hard ceiling and creates a single point of failure.',
      'Horizontal scaling means adding more machines and distributing load across them. It scales further and adds redundancy, but requires the application to be stateless (or externalize state) so any instance can handle any request.',
    ]}
  >
    <div className="space-y-6">
      <ScalingProsCons />
      <ScalingDiagram />
    </div>
  </SectionShell>
)
