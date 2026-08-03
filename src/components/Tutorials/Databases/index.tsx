import { Arrow, Box, Panel, ProsConsCard, SectionShell } from '../Shared'

const DatabaseProsCons = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <ProsConsCard
      title="SQL (PostgreSQL, MySQL...)"
      pros={[
        'ACID transactions guarantee correctness — money, inventory, bookings',
        'Joins let you query relationships without duplicating data',
        'Mature tooling — migrations, ORMs, BI/reporting integrations',
        'Enforced schema catches bad data at write time',
      ]}
      cons={[
        'Schema changes get slower and riskier as tables grow',
        'Horizontal scaling (sharding) is hard to bolt on after the fact',
        'Rigid schema is a poor fit for highly variable or evolving data',
        'A single primary writer still hits a vertical scaling ceiling',
      ]}
    />
    <ProsConsCard
      title="NoSQL (MongoDB, DynamoDB...)"
      pros={[
        'Flexible / schema-less — ship new fields without a migration',
        'Built to scale horizontally across many nodes from day one',
        'Handles very high write throughput — logs, events, telemetry',
        'Data model (document/graph/wide-column) can match the app directly',
      ]}
      cons={[
        'Weaker consistency guarantees by default (eventual consistency)',
        'No joins — related data is often duplicated or fetched separately',
        'Ad-hoc queries and reporting are harder without a fixed schema',
        'Less mature transactional support across multiple documents/rows',
      ]}
    />
  </div>
)

const DatabaseDiagram = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Panel label="SQL" caption="Fixed schema, tables joined by relations">
        <div className="grid grid-cols-3 gap-[3px] p-2 border-2 border-[#cea86f] rounded">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-7 h-5 bg-[#cea86f]/10 border border-[#cea86f]/30" />
          ))}
        </div>
      </Panel>
      <Panel label="NoSQL" caption="Flexible documents, no fixed schema">
        <div className="flex flex-col gap-1">
          <Box className="font-mono">{'{ user: 1 }'}</Box>
          <Box className="font-mono">{'{ order: 7 }'}</Box>
          <Box className="font-mono">{'{ ... }'}</Box>
        </div>
      </Panel>
    </div>
    <Panel label="Sharding" caption="Data split across nodes by key — no single node holds it all">
      <div className="grid grid-cols-3 gap-2 w-full max-w-[320px]">
        <Box>Shard 1 · A–H</Box>
        <Box>Shard 2 · I–P</Box>
        <Box>Shard 3 · Q–Z</Box>
      </div>
    </Panel>
  </div>
)

const ReplicationDiagram = () => (
  <Panel
    label="Primary-Replica Replication"
    caption="Writes go to the primary only; it streams its write-ahead log to replicas, which apply the same changes and can serve reads"
  >
    <div className="flex flex-col items-center gap-2 py-2">
      <Box>Client (write)</Box>
      <Arrow />
      <Box className="border-green-500/60">Primary</Box>
      <Arrow />
      <div className="flex gap-4 flex-wrap justify-center">
        <Box>Replica 1</Box>
        <Box>Replica 2</Box>
      </div>
      <span className="text-[10px] text-gray-400 uppercase tracking-wider">reads served here</span>
    </div>
  </Panel>
)

const ReplicationSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Replication</span>
    <p className="text-white leading-relaxed text-sm">
      Replication keeps copies of the same data on multiple nodes. The common setup is primary-replica
      (leader-follower): every write goes to a single primary, which streams its write-ahead log to one or more
      replicas that apply the same changes in order and stay in sync.
    </p>
    <ul className="space-y-2">
      {[
        'Read scaling: replicas serve read queries so the primary is freed up for writes — read-heavy apps route SELECTs to replicas through a load balancer or a read/write-splitting client',
        'High availability: if the primary fails, a replica is promoted to take over writes (failover) — automatic in managed services like RDS Multi-AZ, manual or orchestrated (e.g. Patroni) when self-hosted',
        'Disaster recovery: a replica in a different region or availability zone survives a full data-center loss',
        'Synchronous replication waits for the replica to confirm the write before acknowledging the client — zero data loss on failover, but adds latency and the primary can stall if a replica lags or goes down',
        'Asynchronous replication acknowledges the write as soon as the primary commits, without waiting on the replica — faster writes, but a primary crash before the replica catches up can lose the most recent transactions',
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
      Replication lag — the gap between a write landing on the primary and reaching a replica — is the main
      thing to design around: a client that writes then immediately reads from a replica can see stale data, so
      reads that must be up to date (e.g. right after a user's own write) should go to the primary instead.
    </p>
  </div>
)

const ShardingSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Sharding</span>
    <p className="text-white leading-relaxed text-sm">
      Sharding splits a single logical dataset across multiple database nodes ("shards"), each holding a subset of
      the rows. Unlike replication, shards don't hold copies of the same data — they partition it, so both storage
      and write throughput scale roughly linearly with the number of shards instead of being capped by one
      machine.
    </p>
    <ul className="space-y-2">
      {[
        'Shard key: the column used to route each row to a shard (e.g. user_id, tenant_id) — picking one with even, high-cardinality distribution is the hardest part of sharding',
        'Range-based sharding: each shard owns a contiguous range of key values (A–H, I–P...) — simple and supports range queries, but prone to hotspots if writes cluster around one range',
        'Hash-based sharding: the key is hashed and the hash determines the shard — spreads load evenly, but a query spanning a range of keys now has to fan out to every shard',
        'Directory-based sharding: a lookup service maps keys to shards explicitly — most flexible, since shards can be rebalanced without changing the hashing scheme, but adds a dependency that must stay available and consistent',
        'Cross-shard joins and transactions are the main cost: a query spanning shards means fanning out to each one and merging results in the application layer, and a write touching multiple shards loses the single-node ACID guarantee',
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
      Sharding solves a scaling ceiling replication can't — a single primary's disk size and write throughput —
      but it's operationally the most expensive lever available: resharding a live dataset (moving data between
      shards without downtime) is one of the harder problems in distributed systems. Reach for it only after
      replication and vertical scaling are exhausted.
    </p>
  </div>
)

const ConsistentHashingDiagram = () => (
  <Panel
    label="Consistent Hashing Ring"
    caption="Nodes and keys are hashed onto the same ring; a key belongs to whichever node is next clockwise"
  >
    <div className="flex items-center gap-2 flex-wrap justify-center py-2">
      <Box className="border-green-500/60">Node A</Box>
      <Arrow dir="right" />
      <Box className="font-mono">hash(key42)</Box>
      <Arrow dir="right" />
      <Box className="border-green-500/60">Node B</Box>
      <Arrow dir="right" />
      <Box className="border-green-500/60">Node C</Box>
      <Arrow dir="right" />
      <span className="text-[10px] text-gray-400 whitespace-nowrap">wraps back to Node A</span>
    </div>
  </Panel>
)

const ConsistentHashingSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Consistent Hashing</span>
    <p className="text-white leading-relaxed text-sm">
      Plain hash-based sharding (hash(key) % N) breaks when N changes — adding or removing a single node reshuffles
      almost every key's assignment, forcing a massive data migration just to add capacity. Consistent hashing
      fixes this by hashing both nodes and keys onto the same fixed ring (e.g. 0 to 2³²−1): a key belongs to
      whichever node is the next one clockwise from its position on the ring.
    </p>
    <ul className="space-y-2">
      {[
        'Adding a node only remaps the keys between it and the previous node on the ring — everything else stays put, instead of roughly N/(N+1) of all keys moving',
        'Removing a node only affects the keys it owned — they fall through to the next node clockwise, no wider reshuffle',
        'Virtual nodes: each physical node is hashed onto the ring at many points (e.g. 100–200) so load stays evenly spread even with few real nodes or an uneven hash function',
        'Used well beyond database sharding: DynamoDB and Cassandra use it for partition placement, and it\'s the standard way to route requests to cache nodes or CDN edge nodes without a central lookup table',
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
      The trade-off versus directory-based sharding is that consistent hashing needs no coordination service —
      every client computes a key's owner independently from the same hash function — at the cost of slightly
      uneven load unless virtual nodes are used to smooth it out.
    </p>
  </div>
)

export const DatabasesSection = () => (
  <SectionShell
    title="Databases: SQL vs NoSQL"
    paragraphs={[
      'Relational (SQL) databases enforce a fixed schema and strong consistency, and excel at complex queries and relationships between data — good fit when data integrity matters more than raw write throughput.',
      'NoSQL databases (document, key-value, wide-column, graph) trade strict schemas and joins for flexibility and horizontal scalability — a better fit for very high write volume or loosely structured data.',
      'Reach for SQL when the data is inherently relational and correctness matters: user accounts, orders and invoices, financial transactions, inventory levels — anything touched by multi-step transactions where a half-applied write would corrupt state.',
      'Reach for NoSQL when the shape of the data varies or changes often, or you need write throughput a single relational primary can\'t keep up with: product catalogs with wildly different attributes per category, activity/event logs, session and cache data, social graphs, or time-series data from IoT sensors.',
      'At scale, both are usually pushed further with replication (copies of data across nodes for redundancy and read scaling) and sharding (splitting data across nodes by key, so no single node holds it all).',
      'Files themselves — images, video, PDFs, backups — shouldn\'t live inside the database at all. Store the file as a blob in dedicated object storage and keep only a reference (a URL or key) in the row next to it. In the cloud that means AWS S3, Google Cloud Storage, Azure Blob Storage, or Cloudflare R2 (S3-compatible, no egress fees). Running your own infrastructure, the equivalent is a self-hosted S3-compatible store like MinIO, or plain network storage (NAS/SAN) behind your own servers.',
    ]}
    points={[
      'SQL: PostgreSQL, MySQL / MariaDB, SQLite, Microsoft SQL Server',
      'NoSQL — Document: MongoDB · Key-Value: Redis, DynamoDB · Wide-column: Cassandra · Graph: Neo4j',
      'Object storage — Cloud: AWS S3, Google Cloud Storage, Azure Blob, Cloudflare R2 · Self-hosted: MinIO, on-prem NAS/SAN',
    ]}
  >
    <div className="space-y-6">
      <DatabaseProsCons />
      <DatabaseDiagram />
      <ReplicationDiagram />
      <ReplicationSection />
      <ShardingSection />
      <ConsistentHashingDiagram />
      <ConsistentHashingSection />
    </div>
  </SectionShell>
)
