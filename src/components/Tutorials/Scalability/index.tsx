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

const ScalingSimpleSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Simple Version</span>
    <p className="text-white leading-relaxed text-sm">
      Picture a coffee shop with one barista who can't keep up with the morning rush. You've got two options.
      Vertical scaling is training that one barista to work faster, or swapping them for a superhuman barista who
      makes drinks twice as fast — same one person, just more capable. Horizontal scaling is opening two more
      registers and hiring two more baristas — same speed per person, but now three people working in parallel.
    </p>
    <p className="text-white leading-relaxed text-sm">
      Both get you more coffee per minute. But there's only so fast one barista can physically move — that's the
      "hard ceiling" of vertical scaling. There's no such limit on how many registers you can open, at least
      until you run out of floor space or customers to bring on more staff.
    </p>
  </div>
)

const ScalingCeilingSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Why Vertical Scaling Has a Ceiling</span>
    <p className="text-white leading-relaxed text-sm">
      With vertical scaling you're just renting a bigger single machine — cloud providers sell fixed sizes (4
      vCPU, 8 vCPU, 16 vCPU...), and every jump up costs more than the last one for the same percentage gain.
      Eventually you hit the biggest machine that exists, and there's nowhere left to go. Worse, resizing usually
      means a reboot, so upgrading means downtime — and if that one machine crashes, everything you run on it
      goes down with it, since there's no second machine to fall back on.
    </p>
  </div>
)

const StatelessWalkthroughDiagram = () => (
  <Panel
    label="Why Horizontal Scaling Needs 'Statelessness'"
    caption="A load balancer can send the next request to any server — so no server can be the only one who remembers you"
  >
    <div className="flex flex-col gap-4 py-2 w-full items-center">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-red-400/80 uppercase mr-1">Broken</span>
        <Box>You log in</Box>
        <Arrow dir="right" />
        <Box className="border-green-500/60">Server A remembers you</Box>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <Box>Your next click</Box>
        <Arrow dir="right" />
        <Box className="border-red-400/60">Server B has never seen you ✕</Box>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center pt-2">
        <span className="text-[10px] text-green-400/80 uppercase mr-1">Fixed</span>
        <Box>Server A or B</Box>
        <Arrow dir="right" />
        <Box className="border-green-500/60">Shared session store (Redis)</Box>
      </div>
    </div>
  </Panel>
)

const StatelessWalkthroughSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <p className="text-white leading-relaxed text-sm">
      Say you log in and the server that handled it, Server A, keeps "you're logged in" only in its own memory.
      Your next click gets randomly routed by the load balancer to Server B — which has no idea who you are,
      because that information only ever existed on Server A. You'd get logged out, or see an empty shopping
      cart that should have items in it. That's what "stateless" is protecting against: no request should depend
      on hitting the one specific server that happens to remember you.
    </p>
    <ul className="space-y-2">
      {[
        'The fix: move anything that needs to be remembered out of any single server\'s memory and into something every server can reach — a shared cache (Redis), a database, or a self-contained token (JWT) the browser carries with it on every request',
        'Once nothing important lives only on one machine, any server can answer any request, and the load balancer is free to send traffic wherever it wants — including a brand new server that just booted up',
        'This is also what makes horizontal scaling resilient: if Server A crashes, Server B can pick up the very next request without missing a beat, because it never depended on A having anything private',
      ].map((point) => (
        <li
          key={point}
          className="flex gap-3 text-gray-300 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20"
        >
          <span className="gold-text">→</span>
          {point}
        </li>
      ))}
    </ul>
  </div>
)

const ScalingWhenSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Which One Should You Actually Use?</span>
    <ul className="space-y-2">
      {[
        'Start vertical: it\'s free complexity-wise — resize the one machine and move on, which is the right call for most apps early on',
        'Move to horizontal when you hit the ceiling (biggest instance still isn\'t enough), need to survive a single machine failing, or want zero-downtime deploys',
        'Most real systems end up doing both: a handful of beefy machines (vertical), each one also duplicated for redundancy and load-sharing (horizontal)',
      ].map((point) => (
        <li
          key={point}
          className="flex gap-3 text-gray-300 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20"
        >
          <span className="gold-text">→</span>
          {point}
        </li>
      ))}
    </ul>
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
      <ScalingSimpleSection />
      <ScalingProsCons />
      <ScalingDiagram />
      <ScalingCeilingSection />
      <StatelessWalkthroughDiagram />
      <StatelessWalkthroughSection />
      <ScalingWhenSection />
    </div>
  </SectionShell>
)
