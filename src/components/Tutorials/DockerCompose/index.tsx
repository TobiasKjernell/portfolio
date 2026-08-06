import { Arrow, Box, CodeBlock, Panel, SectionShell, StepList } from '../Shared'

const ComposeWhySection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Why Not Just Three "docker run" Commands?</span>
    <p className="text-white leading-relaxed text-sm">
      You could start all three containers by hand — but each command needs to know how to reach the others,
      which ports to expose, which environment variables to pass, and in what order to start them so the backend
      doesn't try to connect to a database that isn't up yet. Docker Compose describes all of that once, in one
      file, and starts (or stops) the entire stack with a single command.
    </p>
  </div>
)

const ComposeDiagram = () => (
  <Panel
    label="One Stack, One Network"
    caption="Compose gives every service a hostname matching its name in the file — the backend reaches the database at just 'db', not an IP address"
  >
    <div className="flex flex-col items-center gap-2 py-2 w-full">
      <Box>frontend — :5173</Box>
      <Arrow />
      <Box>backend — :4000</Box>
      <Arrow />
      <Box>db (postgres) — :5432</Box>
    </div>
  </Panel>
)

const ComposeFileSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Compose File</span>
    <p className="text-white leading-relaxed text-sm">
      <code className="text-[#cea86f]">depends_on</code> controls start order, environment variables configure
      each service, and a named <code className="text-[#cea86f]">volume</code> is what keeps the database's data
      alive across restarts — without it, every <code className="text-[#cea86f]">docker compose down</code>{' '}
      would wipe the database clean:
    </p>
    <CodeBlock label="docker-compose.yml">{`services:
  frontend:
    build: ./frontend
    ports:
      - "5173:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/app
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: app
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:`}</CodeBlock>
  </div>
)

const ComposeCommandsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Running the Whole Stack</span>
    <StepList
      steps={[
        'docker compose up -d builds any images that don\'t exist yet and starts all three services in the background',
        'docker compose ps shows what\'s running, and which ports each service is exposed on',
        'docker compose logs -f backend tails just the backend\'s logs — handy when only one piece is misbehaving',
        'docker compose down stops everything; add -v if you also want to wipe the database volume and start clean',
      ]}
    />
    <CodeBlock>{`docker compose up -d
docker compose ps
docker compose logs -f backend
docker compose down`}</CodeBlock>
  </div>
)

export const DockerComposeSection = () => (
  <SectionShell
    title="Docker Compose for Local Dev"
    paragraphs={[
      'Docker Compose wires multiple containers together into one stack, described in a single YAML file — which images to build, how they talk to each other, and what order to start them in.',
      'For a fullstack app this is the entire local dev setup: a new teammate clones the repo, runs one command, and has the frontend, backend and a real database running together — no manually installing Postgres, no version mismatches.',
    ]}
  >
    <div className="space-y-6">
      <ComposeWhySection />
      <ComposeDiagram />
      <ComposeFileSection />
      <ComposeCommandsSection />
    </div>
  </SectionShell>
)
