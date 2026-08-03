import { Arrow, Box, Panel, SectionShell } from '../Shared'

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

const ArchitectureSimpleSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Simple Version</span>
    <p className="text-white leading-relaxed text-sm">
      A monolith is one big house — the kitchen, bedrooms and living room all share the same walls, plumbing and
      foundation. Want to renovate the kitchen? The whole house still has to be treated as one structure; you
      can't just pick it up and move it separately. Microservices are a row of separate small houses instead —
      one for Auth, one for Orders, one for Payments. Each has its own foundation and utilities, so you can
      renovate the Orders house without touching the others at all, but now you need roads connecting them, and
      any one house can have its power go out without warning the others.
    </p>
  </div>
)

const DeployImpactDiagram = () => (
  <Panel
    label="What Happens When Orders Needs a Bug Fix"
    caption="A monolith redeploys everything together; microservices redeploy just the one piece"
  >
    <div className="flex flex-col gap-4 py-2 w-full items-center">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-red-400/80 uppercase mr-1 w-24 text-right">Monolith</span>
        <Box className="border-red-400/60">Auth</Box>
        <Box className="border-red-400/60">Orders (fixed)</Box>
        <Box className="border-red-400/60">Payments</Box>
        <Box className="border-red-400/60">Users</Box>
        <span className="text-[10px] text-gray-400">all restart together</span>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-green-400/80 uppercase mr-1 w-24 text-right">Microservices</span>
        <Box className="opacity-40">Auth</Box>
        <Box className="border-green-500/60">Orders (fixed)</Box>
        <Box className="opacity-40">Payments</Box>
        <Box className="opacity-40">Users</Box>
        <span className="text-[10px] text-gray-400">only Orders restarts</span>
      </div>
    </div>
  </Panel>
)

const FunctionVsNetworkDiagram = () => (
  <Panel
    label="Function Call vs Network Call"
    caption="The same 'get payment status' request behaves very differently depending on the architecture"
  >
    <div className="flex flex-col gap-4 py-2 w-full items-center">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-green-400/80 uppercase mr-1 w-28 text-right">Monolith</span>
        <Box>Orders code</Box>
        <Arrow dir="right" />
        <Box className="border-green-500/60">Payments function — same process, ~microseconds, can't fail alone</Box>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-red-400/80 uppercase mr-1 w-28 text-right">Microservices</span>
        <Box>Orders service</Box>
        <Arrow dir="right" />
        <Box className="border-red-400/60">Payments service — over the network, ~milliseconds, might time out or be down</Box>
      </div>
    </div>
  </Panel>
)

const FunctionVsNetworkSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Part That Actually Trips People Up</span>
    <p className="text-white leading-relaxed text-sm">
      In a monolith, when the Orders code needs a payment status, it just calls a function — like calling a
      friend sitting next to you. It's instant, and it either works or the whole program crashed (in which case
      nothing works anyway). In microservices, that same call has to go out over the network to a completely
      separate Payments service — like calling that friend on the phone instead. The call can be slow, the line
      can drop, or they might just not pick up — and your code now has to handle all of that instead of assuming
      the answer always comes back.
    </p>
    <ul className="space-y-2">
      {[
        'Partial failure: in a monolith, either the whole app is up or it\'s down. In microservices, Payments can be down while Orders, Auth and Users are all perfectly healthy — every service-to-service call needs a plan for "what if the other side doesn\'t answer" (timeouts, retries, fallbacks)',
        'Service discovery: Orders needs to know where Payments actually lives right now (which server, which port) — in a monolith this question doesn\'t even exist, since it\'s all one program',
        'Distributed tracing: one user action can now touch five different services — tools like Jaeger or OpenTelemetry stitch those calls back together into one timeline so you can debug "why was this request slow" at all',
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

const ArchitectureWhenSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Which One Should You Actually Use?</span>
    <ul className="space-y-2">
      {[
        'Start with a monolith unless you already know why you need microservices — it\'s dramatically simpler to build, test, deploy and debug when you\'re still figuring out what the product even is',
        'Split along clear business boundaries (Orders, Payments, Auth), not arbitrary technical layers (all the "controllers" in one service, all the "database code" in another) — a boundary should map to a team and a reason to deploy independently',
        'Reach for microservices when a monolith\'s pain becomes real: one team\'s deploy keeps breaking another team\'s feature, or one part of the system needs to scale to 100x traffic while the rest doesn\'t',
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

export const ArchitectureSection = () => (
  <SectionShell
    title="Monolith vs Microservices"
    paragraphs={[
      'A monolith is a single deployable unit — simple to build, test and deploy early on, but it couples every feature\'s scaling and release cycle together.',
      'Microservices split the system into independently deployable services owning their own data. This enables independent scaling and deploys, at the cost of operational complexity — network calls replace function calls, and you now need service discovery, distributed tracing, and to reason about partial failure.',
    ]}
  >
    <div className="space-y-6">
      <ArchitectureSimpleSection />
      <ArchitectureDiagram />
      <DeployImpactDiagram />
      <FunctionVsNetworkDiagram />
      <FunctionVsNetworkSection />
      <ArchitectureWhenSection />
    </div>
  </SectionShell>
)
