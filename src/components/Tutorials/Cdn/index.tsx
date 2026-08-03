import { Arrow, Box, Panel, SectionShell } from '../Shared'

const CdnDiagram = () => (
  <Panel label="Edge Caching" caption="Edges serve cached assets directly; only a cache miss reaches the origin">
    <div className="grid grid-cols-3 gap-4 w-full max-w-md">
      {[
        ['User · EU', 'Edge · EU'],
        ['User · US', 'Edge · US'],
        ['User · Asia', 'Edge · Asia'],
      ].map(([user, edge]) => (
        <div key={edge} className="flex flex-col items-center gap-1">
          <Box>{user}</Box>
          <Arrow />
          <Box>{edge}</Box>
        </div>
      ))}
    </div>
    <span className="gold-text text-sm leading-none">↘ ↓ ↙</span>
    <Box>Origin Server</Box>
  </Panel>
)

const CdnSimpleSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Simple Version</span>
    <p className="text-white leading-relaxed text-sm">
      Imagine a pizza chain with one giant kitchen in New York, shipping every single pizza — even to a customer
      in Tokyo. It would arrive cold and take forever. Instead, the chain opens small local kitchens in every
      city, each keeping a copy of the recipe and the popular toppings ready to go. A CDN does the same thing for
      websites: instead of every visitor's request travelling all the way to one origin server, copies of your
      images, videos, and JS/CSS files sit on "edge" servers scattered around the world, close to wherever the
      visitor actually is.
    </p>
    <p className="text-white leading-relaxed text-sm">
      Why does distance matter so much? Data can only travel so fast over cables and radio waves. A request from
      Tokyo to a server in New York has to cross half the planet and back — often 150–250ms round trip — before a
      single byte comes back. The same request to a server 50km away might take 5ms. Multiply that delay by every
      image and script a page loads, and it adds up to a page that visibly feels slow.
    </p>
  </div>
)

const CdnWalkthroughDiagram = () => (
  <Panel
    label="First Visitor vs Second Visitor"
    caption="The very first request in a region is a miss that has to reach the origin; everyone after that gets served locally"
  >
    <div className="flex flex-col gap-4 py-2 w-full items-center">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-red-400/80 uppercase mr-1">1st Tokyo visitor</span>
        <Box>User · Tokyo</Box>
        <Arrow dir="right" />
        <Box className="border-red-400/60">Edge · Tokyo ✕</Box>
        <Arrow dir="right" />
        <Box>Origin · New York</Box>
        <Arrow dir="right" />
        <span className="text-[10px] text-gray-400">edge saves a copy</span>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-green-400/80 uppercase mr-1">2nd Tokyo visitor</span>
        <Box>User · Tokyo</Box>
        <Arrow dir="right" />
        <Box className="border-green-500/60">Edge · Tokyo ✓</Box>
        <Arrow dir="right" />
        <span className="text-[10px] text-gray-400">instant, no trip to New York</span>
      </div>
    </div>
  </Panel>
)

const CdnWalkthroughSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">What Actually Gets Cached</span>
    <p className="text-white leading-relaxed text-sm">
      Edge servers work exactly like the caching you saw earlier — check locally first, fall through to the
      origin on a miss, save a copy for next time. The difference is just where that cache physically sits.
    </p>
    <ul className="space-y-2">
      {[
        'Static assets are the ideal fit: images, videos, fonts, and JS/CSS bundles — the same bytes for every visitor, so one cached copy serves millions of requests',
        'Dynamic or personalized content (a logged-in user\'s dashboard, a live stock price) usually can\'t be cached this way — it either skips the edge entirely or gets cached very briefly with careful rules',
        'How long a copy stays valid is controlled by the same Cache-Control / TTL headers as any other cache — a short TTL means fresher content but more trips back to the origin',
        'Most CDNs are "pull" based (they fetch and cache on the first request, like above); some support "push" where you upload content to every edge ahead of time',
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

const CdnBenefitsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">More Than Just Speed</span>
    <p className="text-white leading-relaxed text-sm">
      Cutting latency is the headline reason to use a CDN, but two other benefits usually matter just as much in
      practice.
    </p>
    <ul className="space-y-2">
      {[
        'Less load on the origin: if 99% of requests are served from edge caches, the origin server only has to handle the 1% of true misses — it can run on far less hardware',
        'Traffic spike absorption: a sudden surge (a viral post, a DDoS attempt) hits thousands of distributed edge servers instead of slamming one origin — the CDN soaks it up before it ever reaches your infrastructure',
        'Common providers: Cloudflare, Akamai, Fastly, Amazon CloudFront — most also bundle in free TLS/HTTPS termination at the edge',
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

export const CdnSection = () => (
  <SectionShell
    title="Content Delivery Networks (CDNs)"
    paragraphs={[
      'A CDN caches static assets (images, video, JS/CSS bundles) at edge servers physically close to users, cutting latency and offloading traffic from the origin server.',
    ]}
  >
    <div className="space-y-6">
      <CdnSimpleSection />
      <CdnDiagram />
      <CdnWalkthroughDiagram />
      <CdnWalkthroughSection />
      <CdnBenefitsSection />
    </div>
  </SectionShell>
)
