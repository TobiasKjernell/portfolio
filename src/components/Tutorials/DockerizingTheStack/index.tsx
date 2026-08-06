import { CodeBlock, SectionShell } from '../Shared'

const DockerfileAnatomySection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Anatomy of a Dockerfile</span>
    <p className="text-white leading-relaxed text-sm">
      Before the multi-stage versions below, here's the simplest Dockerfile that could plausibly run a small
      Node app. Every line is a build instruction, and each one adds a new, cached layer to the image:
    </p>
    <CodeBlock label="Dockerfile">{`FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV PORT=4000
EXPOSE 4000
CMD ["node", "index.js"]`}</CodeBlock>
    <ul className="space-y-2">
      {[
        'FROM node:20-alpine — the base image everything else is built on top of. "alpine" is a stripped-down Linux distro, chosen here to keep the final image small',
        'WORKDIR /app — sets the working directory inside the image, creating it if it doesn\'t exist. Every instruction after this one runs relative to that path',
        'COPY package.json package-lock.json ./ — copies just these two files in first, before the rest of the source. Docker caches each instruction as a layer, so if these files haven\'t changed since the last build, it skips reinstalling dependencies entirely',
        'RUN npm ci — executes a command at build time and bakes its result into the image. npm ci installs the exact versions from the lockfile — faster and more reproducible than npm install',
        'COPY . . — copies the rest of the source code in, now that the slow dependency-install step is cached separately from it',
        'ENV PORT=4000 — sets an environment variable baked into the image, available to the app both while building and once a container is actually running',
        'EXPOSE 4000 — documentation, not enforcement. It states which port the app listens on inside the container, but doesn\'t publish it anywhere — that still requires -p at "docker run" time',
        'CMD ["node", "index.js"] — the default command a container runs when it starts from this image. Unlike RUN, this does not execute during the build — only once, when a container actually starts',
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
      That's a complete, working Dockerfile — but it also ships npm, dev dependencies and build tools inside the
      final image, since everything happened in one stage. The multi-stage versions below fix that by splitting
      "build the app" and "run the app" into two separate stages, so only the second stage's tools end up in
      what actually ships.
    </p>
  </div>
)

const FrontendDockerfileSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Frontend — a Multi-Stage Build</span>
    <p className="text-white leading-relaxed text-sm">
      A frontend Dockerfile has a trick worth knowing: a{' '}
      <span className="gold-text">multi-stage build</span>. One stage installs dependencies and runs the
      production build (it needs Node), and a second, much smaller stage just serves the static output (it only
      needs a web server). The first stage's tools never make it into the final image, keeping it small.
    </p>
    <CodeBlock label="frontend/Dockerfile">{`# Stage 1: install deps and build the static files
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve just the built output, nothing else
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}</CodeBlock>
  </div>
)

const BackendDockerfileSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Backend — Node Keeps Running</span>
    <p className="text-white leading-relaxed text-sm">
      A backend API doesn't get to hand its work off to nginx and disappear — Node itself has to keep running to
      answer requests. The build is still multi-stage (installing dev dependencies to compile TypeScript
      shouldn't bloat the final image), but the last stage runs <code className="text-[#cea86f]">node</code>{' '}
      directly instead of a static file server:
    </p>
    <CodeBlock label="backend/Dockerfile">{`# Stage 1: install deps and compile TypeScript to JS
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: install only production deps, copy in the compiled output
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 4000
CMD ["node", "dist/index.js"]`}</CodeBlock>
  </div>
)

const DatabaseImageSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Database — You Don't Write This Dockerfile</span>
    <p className="text-white leading-relaxed text-sm">
      Unlike the frontend and backend, you almost never build a custom image for the database itself — you pull
      the official one (<code className="text-[#cea86f]">postgres:16-alpine</code>,{' '}
      <code className="text-[#cea86f]">mongo:7</code>) and just configure it: which database name, which
      credentials, and — critically — where its data lives outside the container, since a container's own
      filesystem disappears the moment it's removed.
    </p>
  </div>
)

export const DockerizingTheStackSection = () => (
  <SectionShell
    title="Dockerizing Frontend & Backend"
    paragraphs={[
      'A fullstack app is really at least three separate pieces — a frontend, a backend API, and a database — and each one gets its own image, built for what it actually needs to run.',
      'The frontend and backend both benefit from a multi-stage Dockerfile: install and build in one stage, then copy only the finished output into a lean final stage. The database is different — you configure an official image instead of authoring your own.',
    ]}
  >
    <div className="space-y-6">
      <DockerfileAnatomySection />
      <FrontendDockerfileSection />
      <BackendDockerfileSection />
      <DatabaseImageSection />
    </div>
  </SectionShell>
)
