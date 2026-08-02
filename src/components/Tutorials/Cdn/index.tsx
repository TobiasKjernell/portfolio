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

export const CdnSection = () => (
  <SectionShell
    title="Content Delivery Networks (CDNs)"
    paragraphs={[
      'A CDN caches static assets (images, video, JS/CSS bundles) at edge servers physically close to users, cutting latency and offloading traffic from the origin server.',
    ]}
  >
    <CdnDiagram />
  </SectionShell>
)
