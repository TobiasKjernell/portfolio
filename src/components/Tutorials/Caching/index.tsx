import { Arrow, Box, Panel, ProsConsCard, SectionShell } from '../Shared'

const HowCachingWorksDiagram = () => (
  <Panel
    label="How Caching Works, Step by Step"
    caption="The cache is just a fast shortcut sitting in front of the slow, permanent database"
  >
    <div className="flex flex-col items-center gap-3 py-2 w-full max-w-sm">
      <div className="flex items-center gap-3 w-full">
        <span className="gold-text text-xs font-mono w-5 text-right shrink-0">1</span>
        <Box className="flex-1 text-left">You ask for something — e.g. a product page</Box>
      </div>
      <Arrow />
      <div className="flex items-center gap-3 w-full">
        <span className="gold-text text-xs font-mono w-5 text-right shrink-0">2</span>
        <Box className="flex-1 text-left">The app checks the cache first: "do I already have this saved?"</Box>
      </div>
      <Arrow />
      <div className="flex flex-col md:flex-row gap-4 w-full justify-center pt-1">
        <div className="flex flex-col items-center gap-2 flex-1">
          <span className="text-[10px] text-green-400/80 uppercase">Yes — cache hit</span>
          <Box className="border-green-500/60 w-full">Hand back the saved copy — done in about 1ms</Box>
        </div>
        <div className="flex flex-col items-center gap-2 flex-1">
          <span className="text-[10px] text-red-400/80 uppercase">No — cache miss</span>
          <Box className="border-red-400/60 w-full">Ask the slow database, save a copy for next time, then answer</Box>
        </div>
      </div>
    </div>
  </Panel>
)

const HowCachingWorksSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Simple Version</span>
    <p className="text-white leading-relaxed text-sm">
      Think of the database as a filing cabinet in the basement — everything you need is in there, but walking
      down to get it every single time is slow. A cache is a sticky note on your desk: the first time you fetch a
      file, you jot a copy on a sticky note before putting the original back. Next time someone asks for the same
      thing, you just read the sticky note instead of walking downstairs again — much faster, as long as the note
      hasn't gone stale.
    </p>
  </div>
)

const CachingProsCons = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <ProsConsCard
      title="Cache-Aside"
      pros={[
        'Only caches data that\'s actually requested — no wasted memory on unused rows',
        'Cache and database are decoupled — a cache outage just falls back to the database',
        'Easy to bolt onto an existing app without touching the write path',
      ]}
      cons={[
        'First request after a miss (or expiry) always pays the full database latency',
        'Readers can see stale data until the TTL expires',
        'Every read path needs the extra check-then-fetch-then-populate logic',
      ]}
    />
    <ProsConsCard
      title="Write-Through"
      pros={[
        'Cache is always up to date immediately after a write — no stale reads',
        'Reads stay consistently fast since the cache is already warm',
        'Simpler read path — no miss/fallback logic required',
      ]}
      cons={[
        'Every write pays the extra latency of updating the cache too',
        'Wastes cache space on data that\'s written but rarely read',
        'Cache and database can drift if one of the two writes fails partway through',
      ]}
    />
  </div>
)

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

const CacheLayersDiagram = () => (
  <Panel
    label="Where Caching Sits"
    caption="Caching can live at several points along the request path — the closer to the client, the faster, but the harder to keep fresh"
  >
    <div className="flex flex-col items-center gap-2 py-2">
      <Box>Client</Box>
      <Arrow />
      <Box className="border-green-500/60">Browser Cache</Box>
      <Arrow />
      <Box className="border-green-500/60">CDN / Edge Cache</Box>
      <Arrow />
      <Box>App Server</Box>
      <Arrow />
      <Box className="border-green-500/60">Redis Cache</Box>
      <Arrow />
      <Box>Database</Box>
    </div>
  </Panel>
)

const CacheStampedeDiagram = () => (
  <Panel
    label="Cache Stampede"
    caption="A hot key expires and every concurrent request misses at the same instant, multiplying load on the database"
  >
    <div className="flex items-center gap-2 flex-wrap justify-center py-2">
      <div className="flex flex-col gap-1.5">
        <Box>Client A</Box>
        <Box>Client B</Box>
        <Box>Client C</Box>
      </div>
      <Arrow dir="right" />
      <Box className="border-red-400/60">Cache ✕ (expired)</Box>
      <Arrow dir="right" />
      <Box className="border-red-400/60">Database ⚠ 3x load</Box>
    </div>
  </Panel>
)

const CacheStampedeSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Cache Stampede</span>
    <p className="text-white leading-relaxed text-sm">
      A cache stampede (or "dogpile") happens when a popular key expires and a burst of concurrent requests all
      miss at once — each one falls through and hits the database in parallel, multiplying load exactly at the
      moment the cache was supposed to absorb it. On a hot key this can turn one query into thousands of
      simultaneous ones, enough to tip a healthy database over.
    </p>
    <ul className="space-y-2">
      {[
        'Locking / single-flight: the first request to miss acquires a lock and repopulates the cache; other concurrent requests wait for it instead of also querying the database',
        'Probabilistic early expiration: recompute slightly before the TTL actually ends, with rising probability as expiry nears, so refreshes get staggered instead of firing all at once',
        'Stale-while-revalidate: serve the expired value immediately while refreshing it in the background, so no request ever blocks on the database',
        'Never-expire + background refresh: a scheduled job keeps hot keys warm so they never hit a hard miss during traffic',
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
    <p className="text-white leading-relaxed text-sm">
      In practice, single-flight locking combined with stale-while-revalidate is the strongest default: it
      guarantees only one request ever repopulates a given key, while every other concurrent request still gets an
      instant (if momentarily stale) response instead of queueing behind the database.
    </p>
  </div>
)

const CacheFullDiagram = () => (
  <Panel
    label="Cache Full → LRU Eviction"
    caption="At capacity, inserting a new key evicts whichever entry was accessed least recently"
  >
    <div className="flex items-center gap-2 flex-wrap justify-center py-2">
      <div className="flex flex-col gap-1.5">
        <Box className="border-red-400/60">D (oldest)</Box>
        <Box>C</Box>
        <Box>B</Box>
        <Box className="border-green-500/60">A (newest)</Box>
      </div>
      <Arrow dir="right" />
      <Box className="border-red-400/60">Evict D</Box>
      <Arrow dir="right" />
      <Box className="border-green-500/60">Insert E</Box>
    </div>
  </Panel>
)

const CacheFullSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Cache Is Full</span>
    <p className="text-white leading-relaxed text-sm">
      A cache has a fixed memory budget, so eventually a write arrives with no room left. Something has to be
      evicted to make space, and picking the wrong entry means the next request for it becomes an expensive miss —
      so the eviction policy directly determines the cache's hit rate.
    </p>
    <ul className="space-y-2">
      {[
        'LRU (Least Recently Used): evict the entry that hasn\'t been accessed for the longest time — assumes data used recently is likely to be used again soon',
        'Implementation: a hash map (key → node) plus a doubly linked list ordered by access time gives O(1) get and put — every access moves its node to the front, and a full cache evicts from the back',
        'LFU (Least Frequently Used): evicts by access count instead of recency — better when popularity is stable but colder to new items',
        'Redis supports this natively via maxmemory-policy allkeys-lru (or volatile-lru to only evict keys with a TTL set)',
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
    <p className="text-white leading-relaxed text-sm">
      LRU is the default choice for most caches because access recency is a cheap, reliable proxy for future
      demand and the O(1) hash-map-plus-linked-list implementation is simple to reason about — reach for LFU only
      when you've measured that recency genuinely predicts reuse worse than frequency does.
    </p>
  </div>
)

export const CachingSection = () => (
  <SectionShell
    title="Caching"
    paragraphs={[
      'Caching stores frequently accessed data in a fast layer (in-memory, e.g. Redis) so repeated requests avoid expensive database or computation round-trips.',
      'The hard part is invalidation — deciding when cached data goes stale. Common strategies are TTL (expire after N seconds), write-through (update cache on every write) and cache-aside (app populates the cache lazily on a miss).',
      'Take a product page on an e-commerce site: its price, description and stock count are read thousands of times a minute but only change a handful of times a day. Without caching, every page view hits the database directly. With caching, the app checks Redis first — on a hit it returns in about a millisecond; on a miss it queries the database (tens of milliseconds), returns the result, and writes it into Redis with a short TTL (say, 60 seconds). Every request after that is served from memory until the entry expires, or the product is updated and its key is explicitly invalidated.',
    ]}
    points={[
      'Browser cache: static assets and past responses, controlled by Cache-Control / ETag headers',
      'CDN / edge cache: images, video, JS/CSS bundles — served from a location near the user',
      'Application cache (Redis, Memcached): computed results, session data, expensive query results',
      'Database: the source of truth — always consulted on a cache miss',
    ]}
  >
    <div className="space-y-6">
      <HowCachingWorksSection />
      <HowCachingWorksDiagram />
      <CachingProsCons />
      <CachingDiagram />
      <CacheLayersDiagram />
      <h2 className='text-red-500'>Common problems:</h2>
      <CacheStampedeDiagram />
      <CacheStampedeSection />
      <CacheFullDiagram />
      <CacheFullSection />
    </div>
  </SectionShell>
)
