import { Arrow, Box, Panel, SectionShell } from '../Shared'

const CachingDiagram = () => (
  <Panel
    label="Cache Hit vs Cache Miss"
    caption="A hit skips the database entirely; a miss falls through and repopulates the cache"
  >
    <div className="flex flex-col gap-4 py-2 w-full items-center">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-green-400/80 uppercase mr-1">Hit</span>
        <Box>Client</Box>
        <Arrow dir="right" />
        <Box className="border-green-500/60">Cache ✓</Box>
        <Arrow dir="right" />
        <Box>Response</Box>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-red-400/80 uppercase mr-1">Miss</span>
        <Box>Client</Box>
        <Arrow dir="right" />
        <Box className="border-red-400/60">Cache ✕</Box>
        <Arrow dir="right" />
        <Box>Database</Box>
        <Arrow dir="right" />
        <Box>Response</Box>
      </div>
    </div>
  </Panel>
)

export const CachingSection = () => (
  <SectionShell
    title="Caching"
    paragraphs={[
      'Caching stores frequently accessed data in a fast layer (in-memory, e.g. Redis) so repeated requests avoid expensive database or computation round-trips.',
      'The hard part is invalidation — deciding when cached data goes stale. Common strategies are TTL (expire after N seconds), write-through (update cache on every write) and cache-aside (app populates the cache lazily on a miss).',
    ]}
  >
    <CachingDiagram />
  </SectionShell>
)
