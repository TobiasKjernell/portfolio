import { Arrow, Box, CodeBlock, Panel, SectionShell } from '../Shared'

const ComposeStackDiagram = () => (
  <Panel label="The Local Dev Stack" caption="docker compose up starts both containers and wires the network between them">
    <div className="flex items-center gap-4 w-full">
      <Box className="flex-1">api container (uvicorn, built from Dockerfile)</Box>
      <Arrow dir="right" />
      <Box className="flex-1">db container (postgres:16, named volume for data)</Box>
    </div>
  </Panel>
)

export const ContainerizingFastApiSection = () => (
  <SectionShell
    title="Containerizing With Docker"
    paragraphs={[
      "Everything up to this point runs against Postgres installed directly on your machine. That's the last piece of \"works on my machine\" risk left — a teammate's Postgres could be a different version, or not installed at all. Packaging the app and the database as containers means anyone can run docker compose up and get the exact same environment.",
      "This mirrors the approach from this portfolio's own Docker & Kubernetes tutorial series — worth reading first if containers are new to you.",
    ]}
  >
    <div className="space-y-6">
      <CodeBlock label="Dockerfile">{`FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`}</CodeBlock>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Reading The Dockerfile Line By Line</span>
        <ul className="space-y-2 text-sm text-gray-300">
          <li><code>FROM python:3.12-slim</code> — start from a minimal official Python image instead of a full OS</li>
          <li><code>WORKDIR /app</code> — every following instruction runs inside /app inside the container</li>
          <li>requirements.txt is copied and installed <em>before</em> the rest of the code — Docker caches each step, so editing app code won't force a full pip reinstall on every rebuild</li>
          <li><code>--host 0.0.0.0</code> — without this, uvicorn only listens inside the container itself and would be unreachable from outside it</li>
        </ul>
      </div>

      <CodeBlock label="docker-compose.yml">{`services:
  api:
    build: .
    ports:
      - "8000:8000"
    env_file: .env
    environment:
      DATABASE_URL: postgresql+psycopg://bloguser:bogpass@db/blog
    depends_on:
      - db
    command: >
      sh -c "alembic upgrade head &&
             uvicorn main:app --host 0.0.0.0 --port 8000"

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: bloguser
      POSTGRES_PASSWORD: bogpass
      POSTGRES_DB: blog
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`}</CodeBlock>

      <ComposeStackDiagram />

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Why The Hostname Changes To "db"</span>
        <p className="text-white leading-relaxed text-sm">
          Locally, <code>DATABASE_URL</code> pointed at <code>localhost</code>. Inside Compose's network,{' '}
          <code>localhost</code> from the <code>api</code> container's point of view is the <code>api</code>{' '}
          container itself — not the database. Compose gives each service a hostname matching its name in the file,
          so the connection string changes to <code>@db/blog</code>, where <code>db</code> resolves to the Postgres
          container automatically.
        </p>
      </div>

      <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
        <span className="text-sm font-semibold gold-text">Running Migrations On Startup</span>
        <p className="text-white leading-relaxed text-sm">
          The api service's <code>command</code> runs <code>alembic upgrade head</code> before starting uvicorn, so
          a freshly created database is brought up to the latest schema automatically every time the stack starts —
          the same command from the migrations step, just run once at container boot instead of by hand.
        </p>
      </div>

      <CodeBlock label="terminal">{`docker compose up --build`}</CodeBlock>
    </div>
  </SectionShell>
)
