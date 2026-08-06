import { SectionShell } from '../Shared'

export const DockerKubernetesKeyTakeawaysSection = () => (
  <SectionShell
    title="Key Takeaways"
    paragraphs={[
      "None of this is mandatory for every project — a purely static frontend doesn't need a container or a cluster at all, and a CDN-backed static host will out-perform a hand-run cluster for that case with a fraction of the effort. Docker and Kubernetes earn their place once there's a real backend and database to run alongside the frontend, deployed and scaled together.",
    ]}
    points={[
      'Skip containers entirely for a static SPA or statically-generated site with no server-side logic',
      'Reach for Docker + Compose (no Kubernetes) for a small fullstack project — one machine, one command, real self-healing not required yet',
      'Reach for Kubernetes once the stack needs to scale, deploy independently piece by piece, or already lives alongside a larger backend system on a cluster',
      'Multi-stage Dockerfiles keep both the frontend and backend images lean — build tools never ship in the final image',
      'Keep the database out of plain Deployments — it\'s stateful where everything else in Kubernetes assumes disposability; a StatefulSet or, more commonly, a managed database is the right home for it',
      'ConfigMaps and Secrets keep credentials out of images, but remember the frontend\'s env vars are frozen in at build time, not read at runtime like the backend\'s',
    ]}
  />
)
