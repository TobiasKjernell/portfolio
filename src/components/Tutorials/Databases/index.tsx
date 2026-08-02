import { Box, Panel, ProsConsCard, SectionShell } from '../Shared'

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
    </div>
  </SectionShell>
)
