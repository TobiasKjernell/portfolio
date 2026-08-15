import { CodeBlock, SectionShell, StepList } from '../Shared'

export const PgvectorSetupSection = () => (
  <SectionShell
    title="DB — Installing Postgres + pgvector"
    paragraphs={[
      'pgvector is a Postgres extension that adds a vector column type plus the distance operators needed for similarity search — it turns an ordinary Postgres instance into a vector database, with no separate service to run.',
      "The fastest path is the pgvector/pgvector Docker image, which is plain Postgres with the extension pre-installed. If you already have Postgres running from the FastAPI tutorial's setup, you can add the extension to that same instance instead.",
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="docker-compose.yml">{`services:
  db:
    image: pgvector/pgvector:pg16
    environment:
      POSTGRES_USER: raguser
      POSTGRES_PASSWORD: ragpass
      POSTGRES_DB: ragdb
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`}</CodeBlock>

      <StepList
        steps={[
          'docker compose up -d — starts Postgres with pgvector already installed',
          'Connect with psql -U raguser -d ragdb -h localhost',
          'Run CREATE EXTENSION IF NOT EXISTS vector; once, inside that database',
          'Verify it worked with \\dx — vector should show up in the extension list',
        ]}
      />

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Already Have Postgres Running?</span>
        <p className="text-white leading-relaxed text-sm">
          If you're reusing the Postgres instance from the FastAPI tutorial instead of a fresh Docker container, the
          extension needs to be available on the server first — on Ubuntu/Debian that's{' '}
          <code>sudo apt install postgresql-16-pgvector</code> (version-matched to your Postgres install), then the
          same <code>CREATE EXTENSION</code> statement run inside your database:
        </p>
        <CodeBlock>{`CREATE EXTENSION IF NOT EXISTS vector;`}</CodeBlock>
        <p className="text-white leading-relaxed text-sm">
          This is a one-time, per-database step — it doesn't need to be repeated after restarts, only if you create a
          brand new database.
        </p>
      </div>
    </div>
  </SectionShell>
)
