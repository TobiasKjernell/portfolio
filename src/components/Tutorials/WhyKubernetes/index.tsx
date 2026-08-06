import { SectionShell } from '../Shared'

const WhyOrchestrationSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Where Compose Stops Being Enough</span>
    <p className="text-white leading-relaxed text-sm">
      Docker Compose is fantastic for local dev, but it's built around one file describing containers on one
      machine. Production raises different questions: what restarts a crashed backend container automatically,
      at 3am, with nobody watching? What happens when traffic spikes and one instance of the API isn't enough?
      How do you push a new version of the frontend without a gap where nothing is serving requests? And what
      happens to everything if that one machine goes down? Kubernetes exists to answer exactly these questions —
      it runs a fleet of containers the way you described, across a cluster of machines, without you babysitting
      each one by hand.
    </p>
  </div>
)

const KubernetesSimpleSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Simple Version</span>
    <p className="text-white leading-relaxed text-sm">
      If Docker is the shipping container, Kubernetes is the port. It's the system that decides which container
      goes where, replaces one that falls overboard, and reroutes traffic if a dock goes down. Managing one
      container by hand is easy; managing a hundred — some crashing, some needing more copies during a traffic
      spike, some mid-update — is not. You describe the end state you want ("3 copies of the backend, always
      running"), and Kubernetes continuously works to make reality match that description, whether the cause of
      drift was a crash, a deploy, or a machine dying outright.
    </p>
  </div>
)

export const WhyKubernetesSection = () => (
  <SectionShell
    title="Why Kubernetes"
    paragraphs={[
      'A single machine running Docker Compose is a single point of failure and a ceiling on scale — everything lives on one box. Kubernetes takes the same idea as Compose (describe your services, let the tooling run them) and extends it across a whole cluster of machines, adding self-healing, autoscaling and zero-downtime rollouts along the way.',
    ]}
    points={[
      'Self-healing: a crashed container is detected and replaced automatically, no on-call page required',
      'Scaling: add more copies of the backend under load, or scale back down when traffic drops, without touching the frontend or database',
      'Rolling updates: new versions roll out a few instances at a time, so there\'s never a moment with zero healthy instances serving traffic',
    ]}
  >
    <div className="space-y-6">
      <WhyOrchestrationSection />
      <KubernetesSimpleSection />
    </div>
  </SectionShell>
)
