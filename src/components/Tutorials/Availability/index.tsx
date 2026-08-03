import { Arrow, Box, Panel, SectionShell } from '../Shared'

const AvailabilityDiagram = () => (
  <Panel label="Redundant Instances" caption="One instance fails — traffic simply routes around it">
    <div className="flex flex-col items-center gap-2 py-2 w-full">
      <Box>Client</Box>
      <div className="grid grid-cols-3 gap-4 w-full max-w-[260px] text-center text-lg leading-none">
        <span className="gold-text">↓</span>
        <span className="text-red-500/70">✕</span>
        <span className="gold-text">↓</span>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full max-w-[260px]">
        <Box>Server A</Box>
        <Box className="border-red-500/50 text-red-400/80">Server B</Box>
        <Box>Server C</Box>
      </div>
    </div>
  </Panel>
)

const NinesTable = () => (
  <Panel label="The 'Nines'" caption="Each extra 9 looks small on paper but shrinks allowed downtime by 10x">
    <div className="w-full max-w-md text-xs">
      <div className="grid grid-cols-3 gap-2 text-gray-500 uppercase text-[10px] pb-2 border-b border-[#cea86f]/20">
        <span>Availability</span>
        <span>Downtime / year</span>
        <span>Downtime / day</span>
      </div>
      {[
        ['99%', '~3.65 days', '~14.4 min'],
        ['99.9%', '~8.76 hours', '~1.44 min'],
        ['99.99%', '~52.6 minutes', '~8.6 sec'],
        ['99.999%', '~5.3 minutes', '~0.86 sec'],
      ].map(([pct, perYear, perDay]) => (
        <div key={pct} className="grid grid-cols-3 gap-2 py-2 border-b border-[#cea86f]/10 text-gray-300">
          <span className="gold-text font-semibold">{pct}</span>
          <span>{perYear}</span>
          <span>{perDay}</span>
        </div>
      ))}
    </div>
  </Panel>
)

const AvailabilityVsReliabilitySection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Availability vs Reliability — They're Not the Same</span>
    <p className="text-white leading-relaxed text-sm">
      It's easy to lump these together, but they answer different questions. Availability asks "is the system up
      right now?" — can a request get a response at all. Reliability asks "is the response correct?" — does the
      system keep doing the right thing over time. A system can score well on one and badly on the other.
    </p>
    <ul className="space-y-2">
      {[
        'Available but not reliable: the server responds instantly to every request (100% uptime) but a bug silently returns the wrong order total — always up, often wrong',
        'Reliable but not available: a payment service that never miscalculates a charge, but crashes under load every Friday during a sale and stays down for an hour — always correct when it works, but often unreachable',
        'The goal is both at once: a system that is up when you need it and trustworthy when it answers',
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

const MtbfMttrSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">How Availability Is Actually Calculated</span>
    <p className="text-white leading-relaxed text-sm">
      Availability isn't a vibe — it comes from two measured numbers. MTBF (Mean Time Between Failures) is how
      long the system typically runs before something breaks. MTTR (Mean Time To Recovery) is how long it takes
      to detect and fix a failure once it happens. Availability is the fraction of time spent working:
    </p>
    <div className="flex justify-center py-2">
      <Box className="font-mono text-[13px] px-6 py-4 border-[#cea86f]">
        Availability = MTBF / (MTBF + MTTR)
      </Box>
    </div>
    <ul className="space-y-2">
      {[
        'Example: a server that runs for 30 days (720 hours) between failures and takes 15 minutes to recover gives 720 / (720 + 0.25) ≈ 99.965% availability',
        'Raising MTBF (fewer failures) and lowering MTTR (faster recovery) are the only two levers — good engineering usually invests in both: redundancy and testing reduce failures, monitoring and automated failover shrink recovery time',
        'In practice, shrinking MTTR is often cheaper and faster to improve than raising MTBF — good alerting and a one-click rollback beat trying to make software that never breaks',
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

const RedundancyDiagram = () => (
  <Panel
    label="Active-Passive vs Active-Active"
    caption="Active-passive keeps a standby idle until failover; active-active shares the load and absorbs a failure without a switchover"
  >
    <div className="flex flex-col md:flex-row gap-6 items-center justify-center py-2">
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider text-gray-500">Active-Passive</span>
        <Box className="border-green-500/60">Primary (live)</Box>
        <Arrow />
        <Box className="text-gray-500">Standby (idle)</Box>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider text-gray-500">Active-Active</span>
        <div className="flex gap-2">
          <Box className="border-green-500/60">Node A (live)</Box>
          <Box className="border-green-500/60">Node B (live)</Box>
        </div>
      </div>
    </div>
  </Panel>
)

const RedundancyPatternsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">How Redundancy Is Actually Wired Up</span>
    <p className="text-white leading-relaxed text-sm">
      Running multiple instances only helps if traffic actually moves off a failed one. That requires two things
      working together: a way to detect the failure, and a way to reroute around it.
    </p>
    <ul className="space-y-2">
      {[
        'Health checks: a load balancer (or orchestrator like Kubernetes) pings each instance every few seconds — miss enough checks in a row and it\'s pulled out of rotation automatically, no human involved',
        'Single point of failure (SPOF): any one component that, if it dies, takes the whole system down with it — the entire point of redundancy is to eliminate these one by one (multiple servers, multiple database replicas, multiple availability zones)',
        'Active-passive failover: one instance handles all traffic while a standby sits ready; on failure, the standby is promoted — simpler to reason about, but the standby\'s capacity sits unused until something breaks',
        'Active-active: multiple instances all handle traffic simultaneously; if one fails, the others simply absorb its share — better hardware utilization and a faster failover, but requires the app to not depend on state pinned to a single instance',
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

export const AvailabilitySection = () => (
  <SectionShell
    title="Availability & Reliability"
    paragraphs={[
      'Availability is the percentage of time a system is operational and able to respond to requests, usually expressed in "nines" (99.9%, 99.99%...). Reliability is a different question: whether the system keeps producing correct results consistently, whether or not it happens to be up.',
      'Think of it like a shop: availability is whether the doors are open when a customer tries to walk in. Reliability is whether the product they buy actually works once they get it home. A shop can be open every hour of the year and still sell broken products — and a shop that only sells perfect products is no good to anyone if it\'s closed half the time.',
      'Both are achieved primarily through redundancy — running multiple instances of every critical component so the failure of one does not take down the whole system — combined with health checks that detect a failure and automatic failover that reroutes traffic around it.',
    ]}
  >
    <div className="space-y-6">
      <AvailabilityDiagram />
      <NinesTable />
      <AvailabilityVsReliabilitySection />
      <MtbfMttrSection />
      <RedundancyDiagram />
      <RedundancyPatternsSection />
    </div>
  </SectionShell>
)
