import { CodeBlock, SectionShell } from '../Shared'

const InstallSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Installing Docker The Right Way</span>
    <p className="text-white leading-relaxed text-sm">
      Ubuntu's own <code>apt</code> repo carries an older, slower-updated Docker package — Docker's own official
      repo is the one almost everyone actually wants.
    </p>
    <CodeBlock label="terminal">{`curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER      # run docker without typing sudo every time
newgrp docker                        # or just log out and back in for it to take effect

docker --version
docker compose version`}</CodeBlock>
  </div>
)

const RunningContainersSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Running A Real App With Docker Compose</span>
    <p className="text-white leading-relaxed text-sm">
      Most real deployments aren't one container, they're a small stack — an app plus a database — defined
      together so the whole thing comes up (and goes down) as one unit.
    </p>
    <CodeBlock label="docker-compose.yml">{`services:
  app:
    image: myorg/myapp:latest
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"    # only reachable locally — Nginx proxies to it, same as before
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/myapp
    depends_on:
      - db

  db:
    image: postgres:16
    restart: unless-stopped
    environment:
      - POSTGRES_PASSWORD=pass
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`}</CodeBlock>
    <CodeBlock label="terminal">{`docker compose up -d           # start everything, detached
docker compose ps                # what's running
docker compose logs -f app         # follow one service's logs
docker compose pull && docker compose up -d   # deploy a new image version
docker compose down               # stop everything (volumes survive unless you add -v)`}</CodeBlock>
  </div>
)

const MaintenanceSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Keeping Docker Itself Tidy</span>
    <p className="text-white leading-relaxed text-sm">
      Unused images, stopped containers and dangling build layers quietly eat disk space on a long-running
      server if nothing ever cleans them up.
    </p>
    <CodeBlock label="terminal">{`docker system df              # see how much space images/containers/volumes are using
docker system prune -f          # remove stopped containers, unused networks, dangling images
docker image prune -a -f          # more aggressive — also removes any image not used by a running container`}</CodeBlock>
  </div>
)

export const UbuntuServerDockerSection = () => (
  <SectionShell
    title="Running Containers With Docker"
    paragraphs={[
      "For anything beyond a single simple service, Docker is how most teams actually deploy to Ubuntu Server today — it bundles an app with its exact dependencies, so \"works on my machine\" stops being a server-side problem.",
    ]}
  >
    <div className="space-y-6">
      <InstallSection />
      <RunningContainersSection />
      <MaintenanceSection />
    </div>
  </SectionShell>
)
