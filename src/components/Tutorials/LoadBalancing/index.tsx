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
      <LoadBalancingProsCons />
      <LoadBalancingDiagram />
    </div>
  </SectionShell>
)
