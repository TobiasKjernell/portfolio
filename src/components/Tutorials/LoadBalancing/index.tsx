import { Arrow, Box, Panel, ProsConsCard, SectionShell } from '../Shared'

const LoadBalancingProsCons = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <ProsConsCard
      title="Self-Hosted (NGINX, HAProxy, Envoy...)"
      pros={[
        'Full control over routing rules, TLS termination and custom logic',
        'No vendor lock-in — portable across any infrastructure',
        'Can be cheaper at real scale — no per-request or per-GB provider fees',
        'Runs anywhere, including on-prem or air-gapped environments',
      ]}
      cons={[
        'You own the ops burden — patching, scaling and HA for the load balancer itself',
        'No built-in geographic distribution — you build that yourself',
        'Becomes its own single point of failure unless you run redundant instances',
        'Slower to provision — no autoscaling at the click of a button',
      ]}
    />
    <ProsConsCard
      title="Cloud / Managed (ALB, Cloud LB, Cloudflare...)"
      pros={[
        'Provider handles HA, patching and scaling of the load balancer itself',
        'Scales automatically with traffic — no capacity planning',
        'Integrates natively with autoscaling groups, health checks, DDoS protection',
        'Billed per use — quick to provision, minimal setup',
      ]}
      cons={[
        'Less low-level control over routing and behavior',
        'Vendor lock-in — configuration tied to one provider\'s API',
        'Costs can grow unpredictably with traffic volume',
        'An extra network hop through provider infra can add latency in some regions',
      ]}
    />
  </div>
)

const LoadBalancingDiagram = () => (
  <div className="space-y-6">
    <Panel
      label="Round Robin + Health Checks"
      caption="Requests rotate evenly across healthy servers; failing ones are pulled from rotation"
    >
      <div className="flex flex-col items-center gap-2 py-2 w-full">
        <Box>Load Balancer</Box>
        <div className="grid grid-cols-3 gap-4 w-full max-w-[260px] text-center gold-text text-xs leading-none">
          <span>1 ↓</span>
          <span>2 ↓</span>
          <span>3 ↓</span>
        </div>
        <div className="grid grid-cols-3 gap-2 w-full max-w-[260px]">
          <Box>Server A</Box>
          <Box>Server B</Box>
          <Box>Server C</Box>
        </div>
      </div>
    </Panel>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Panel
        label="Stateful (Sticky Sessions)"
        caption="Session data lives on one server — losing that server drops every session it held"
      >
        <div className="flex flex-col items-center gap-2 py-2 w-full">
          <Box>Client</Box>
          <Arrow />
          <Box>Load Balancer</Box>
          <Arrow />
          <div className="grid grid-cols-3 gap-2 w-full max-w-[260px]">
            <Box className="ring-2 ring-[#cea86f]">Server A</Box>
            <Box className="opacity-30">Server B</Box>
            <Box className="opacity-30">Server C</Box>
          </div>
        </div>
      </Panel>

      <Panel
        label="Stateless + Shared Store"
        caption="Session state lives externally, so any server can handle any request"
      >
        <div className="flex flex-col items-center gap-2 py-2 w-full">
          <Box>Client</Box>
          <Arrow />
          <Box>Load Balancer</Box>
          <Arrow />
          <div className="grid grid-cols-3 gap-2 w-full max-w-[260px]">
            <Box>Server A</Box>
            <Box>Server B</Box>
            <Box>Server C</Box>
          </div>
          <div className="grid grid-cols-3 gap-4 w-full max-w-[260px] text-center gold-text text-sm leading-none">
            <span>↘</span>
            <span>↓</span>
            <span>↙</span>
          </div>
          <Box>Shared Store · Redis</Box>
        </div>
      </Panel>
    </div>
  </div>
)

const LbSimpleSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Simple Version</span>
    <p className="text-white leading-relaxed text-sm">
      Picture a grocery store with five checkout lanes but no one directing customers. Everyone just picks a
      lane at random — some lanes end up with ten people, others sit empty, and if one register breaks, that
      whole line is stuck with nowhere to go. A load balancer is the staff member standing at the front, pointing
      each new customer to whichever lane makes sense: the shortest one, the next one in rotation, or the one
      whose register isn't broken. Customers never talk to the checkout lanes directly — they always go through
      that one traffic director first.
    </p>
  </div>
)

const LbStrategiesDiagram = () => (
  <Panel
    label="Common Routing Strategies"
    caption="Different rules for deciding which server gets the next request"
  >
    <div className="flex flex-col gap-4 py-2 w-full items-center text-xs">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-gray-400 uppercase w-32 text-right">Round robin</span>
        <Box>1</Box>
        <Arrow dir="right" />
        <Box>2</Box>
        <Arrow dir="right" />
        <Box>3</Box>
        <Arrow dir="right" />
        <Box>1</Box>
        <Arrow dir="right" />
        <span className="text-gray-500">...repeats in order</span>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-gray-400 uppercase w-32 text-right">Least connections</span>
        <Box className="opacity-40">A · 9 active</Box>
        <Box className="border-green-500/60">B · 2 active ✓</Box>
        <Box className="opacity-40">C · 6 active</Box>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-gray-400 uppercase w-32 text-right">Consistent hashing</span>
        <Box>User #42</Box>
        <Arrow dir="right" />
        <Box className="border-green-500/60">always Server B</Box>
      </div>
    </div>
  </Panel>
)

const LbStrategiesSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <ul className="space-y-2">
      {[
        'Round robin: hand out requests in a fixed rotation — server 1, then 2, then 3, then back to 1 — simple and fair when every server and every request is roughly equal',
        'Least connections: send the next request to whichever server currently has the fewest requests still in progress — better than round robin when some requests take much longer than others',
        'Consistent hashing: the same user (or key) always lands on the same server, based on hashing their ID — useful when a server has built up something worth reusing for that user, like a warm local cache',
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

const LbHealthChecksDiagram = () => (
  <Panel
    label="Health Checks in Action"
    caption="The load balancer keeps polling every server; a few missed replies and it's pulled from rotation"
  >
    <div className="flex flex-col items-center gap-3 py-2 w-full">
      <Box>Load Balancer</Box>
      <div className="grid grid-cols-3 gap-6 w-full max-w-[300px] text-center text-[10px] leading-none">
        <span className="text-green-400/80">ping ✓</span>
        <span className="text-red-400/80">ping ✕</span>
        <span className="text-green-400/80">ping ✓</span>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full max-w-[300px]">
        <Box>Server A</Box>
        <Box className="border-red-400/60 text-red-400/80">Server B — removed</Box>
        <Box>Server C</Box>
      </div>
    </div>
  </Panel>
)

const LbHealthChecksSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">How It Knows a Server Is Down</span>
    <p className="text-white leading-relaxed text-sm">
      The load balancer doesn't wait for a customer to complain. Every few seconds it quietly pings a small
      "/health" endpoint on each server — basically asking "are you still there and working?" If a server misses
      enough pings in a row, it gets pulled out of rotation automatically, and no new requests are sent to it
      until it starts answering again. This is also what makes zero-downtime deploys possible: a server can be
      taken offline for an update, finish it, pass its health check again, and quietly rejoin the rotation —
      users never notice a thing.
    </p>
  </div>
)

export const LoadBalancingSection = () => (
  <SectionShell
    title="Load Balancing"
    paragraphs={[
      'A load balancer sits in front of a fleet of servers and distributes incoming requests across them, using strategies like round robin, least connections, or consistent hashing.',
      'Beyond distributing traffic, it also removes unhealthy instances from rotation, enabling zero-downtime deploys and horizontal scaling.',
      'Stateless services are trivial to load balance — since no per-user data lives on the server, any instance can handle any request. Stateful services keep data like a session or shopping cart in server memory, which forces "sticky sessions": the load balancer pins a client to the same instance (usually via a cookie) for the life of its session.',
      'Sticky sessions work, but they chip away at the point of horizontal scaling — losing that one instance loses every session it held, and traffic can get lumpy as some instances end up holding more "stuck" clients than others. The fix is a shared store: pull session state out of the app and into something every instance can read and write, such as Redis or Memcached. Once sessions live externally, the app is stateless again and the load balancer is free to route each request to whichever healthy instance is least loaded.',
    ]}
    points={[
      'Self-hosted: NGINX, HAProxy, Envoy, Traefik — you run and configure them yourself, full control over routing rules',
      'Cloud / managed: AWS ALB & NLB, Google Cloud Load Balancing, Azure Load Balancer, Cloudflare Load Balancing — no infra to run, scales automatically with the provider\'s network',
    ]}
  >
    <div className="space-y-6">
      <LbSimpleSection />
      <LbStrategiesDiagram />
      <LbStrategiesSection />
      <LbHealthChecksDiagram />
      <LbHealthChecksSection />
      <LoadBalancingProsCons />
      <LoadBalancingDiagram />
    </div>
  </SectionShell>
)
