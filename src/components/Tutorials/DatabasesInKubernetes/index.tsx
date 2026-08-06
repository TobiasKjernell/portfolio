import { Box, CodeBlock, Panel, ProsConsCard, SectionShell } from '../Shared'

const TensionSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Problem: Pods Are Disposable, Databases Aren't</span>
    <p className="text-white leading-relaxed text-sm">
      Everything about a Deployment assumes its Pods are interchangeable and throwaway — Kubernetes can kill and
      recreate any of them at any time without anyone noticing. That's exactly what you want for a stateless
      frontend or backend, and exactly what you can't afford for a database: if the Pod holding Postgres gets
      recreated on a plain Deployment, its data goes with it, because a Pod's own filesystem disappears the
      moment the Pod does.
    </p>
  </div>
)

const StatefulSetDiagram = () => (
  <Panel
    label="StatefulSet vs Deployment"
    caption="A StatefulSet gives each Pod a stable identity and its own storage that follows it across restarts"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] text-gray-400 uppercase">Deployment (frontend / backend)</span>
        <Box>Pod — any name, any node, no storage tie</Box>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] text-gray-400 uppercase">StatefulSet (database)</span>
        <Box className="border-green-500/60">db-0 — bound to its own PersistentVolumeClaim</Box>
      </div>
    </div>
  </Panel>
)

const StatefulSetYamlSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Running Postgres With a StatefulSet</span>
    <p className="text-white leading-relaxed text-sm">
      <code className="text-[#cea86f]">volumeClaimTemplates</code> is the key difference from a Deployment — it
      provisions a real, persistent disk (a PersistentVolume) for each Pod, and reattaches that same disk if the
      Pod is ever recreated, instead of handing it a fresh empty one:
    </p>
    <CodeBlock label="postgres-statefulset.yaml">{`apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: db
spec:
  serviceName: db
  replicas: 1
  selector:
    matchLabels:
      app: db
  template:
    metadata:
      labels:
        app: db
    spec:
      containers:
        - name: postgres
          image: postgres:16-alpine
          env:
            - name: POSTGRES_PASSWORD
              value: postgres
          ports:
            - containerPort: 5432
          volumeMounts:
            - name: db-storage
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: db-storage
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi`}</CodeBlock>
  </div>
)

const ManagedVsSelfHostedProsCons = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <ProsConsCard
      title="Running Your Own DB in the Cluster"
      pros={[
        'Everything lives in one place, one set of tools, one bill',
        'No network hop out to an external provider — potentially lower latency',
        'Full control over version, extensions and tuning',
      ]}
      cons={[
        'You own backups, failover and disaster recovery yourself — Kubernetes does not do this for you',
        'A cluster-wide incident (a bad node, a botched upgrade) can now take the database down too',
        'Scaling storage and doing safe version upgrades on a stateful workload is real, unforgiving operational work',
      ]}
    />
    <ProsConsCard
      title="Managed Database (RDS, Cloud SQL, Supabase...)"
      pros={[
        'Automated backups, point-in-time recovery and failover handled by the provider',
        'Scaling storage and compute is a few clicks, not a migration project',
        'Completely decoupled from whatever happens to the Kubernetes cluster itself',
      ]}
      cons={[
        'Another vendor bill, and another piece of infrastructure living outside your cluster\'s config',
        'Slightly higher latency than an in-cluster database, usually immaterial in practice',
      ]}
    />
  </div>
)

const RecommendationSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Honest Recommendation</span>
    <p className="text-white leading-relaxed text-sm">
      For almost every team, the pragmatic choice is: keep the frontend and backend in Kubernetes, since they're
      stateless and Kubernetes is genuinely great at running stateless things — and point the backend at a
      managed database outside the cluster instead of running Postgres yourself. StatefulSets are worth knowing
      because they explain how Kubernetes can run stateful workloads at all, but reaching for a managed database
      first is the right default for a fullstack app, not a compromise.
    </p>
  </div>
)

export const DatabasesInKubernetesSection = () => (
  <SectionShell
    title="Databases in Kubernetes"
    paragraphs={[
      'The frontend and backend fit naturally into Deployments — stateless, interchangeable, disposable. A database is none of those things, and putting one in a plain Deployment is a common and painful mistake.',
      'Kubernetes has a real answer for stateful workloads — the StatefulSet — but the more common real-world answer for a fullstack app is to keep the database out of the cluster entirely, on a managed provider.',
    ]}
  >
    <div className="space-y-6">
      <TensionSection />
      <StatefulSetDiagram />
      <StatefulSetYamlSection />
      <ManagedVsSelfHostedProsCons />
      <RecommendationSection />
    </div>
  </SectionShell>
)
