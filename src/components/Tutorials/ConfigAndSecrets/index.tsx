import { Arrow, Box, CodeBlock, Panel, SectionShell } from '../Shared'

const ConfigMapSecretSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">ConfigMaps and Secrets</span>
    <p className="text-white leading-relaxed text-sm">
      Kubernetes splits configuration into two objects that look almost identical but mean different things: a{' '}
      <span className="gold-text">ConfigMap</span> holds plain, non-sensitive values (an API base path, a feature
      flag), and a <span className="gold-text">Secret</span> holds sensitive ones (a database password, an API
      key) — base64-encoded at rest and access-controlled separately, so not every service in the cluster can
      read every credential.
    </p>
    <CodeBlock label="backend-config.yaml">{`apiVersion: v1
kind: ConfigMap
metadata:
  name: backend-config
data:
  NODE_ENV: "production"
---
apiVersion: v1
kind: Secret
metadata:
  name: backend-secret
type: Opaque
stringData:
  DATABASE_URL: postgres://app:changeme@db:5432/app`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      A Deployment pulls both in as environment variables with <code className="text-[#cea86f]">envFrom</code> —
      the backend container never needs to know or care which values came from where:
    </p>
    <CodeBlock label="backend-deployment.yaml (excerpt)">{`spec:
  containers:
    - name: backend
      image: my-backend:latest
      envFrom:
        - configMapRef:
            name: backend-config
        - secretRef:
            name: backend-secret`}</CodeBlock>
  </div>
)

const RuntimeVsBuildDiagram = () => (
  <Panel
    label="Backend vs Frontend: When Config Gets Read"
    caption="The backend reads config the moment the container starts; the frontend's config was frozen in long before the container even existed"
  >
    <div className="flex flex-col gap-4 py-2 w-full items-center">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-green-400/80 uppercase mr-1 w-28 text-right">Backend</span>
        <Box>Secret / ConfigMap</Box>
        <Arrow dir="right" />
        <Box className="border-green-500/60">Container starts, reads env vars — change the Secret, restart the Pod, done</Box>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="text-[10px] text-red-400/80 uppercase mr-1 w-28 text-right">Frontend</span>
        <Box>Env var at build time</Box>
        <Arrow dir="right" />
        <Box className="border-red-400/60">Value already compiled into the JS bundle before the image even exists</Box>
      </div>
    </div>
  </Panel>
)

const FrontendGotchaSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Gotcha That Trips Up Every Fullstack Team</span>
    <p className="text-white leading-relaxed text-sm">
      Backend env vars are read at runtime — inject a Secret, restart the process, the new value takes effect.
      Frontend build tools (Vite, Create React App, webpack) bake env vars into the JavaScript bundle at{' '}
      <span className="gold-text">build</span> time instead. That means the same frontend image can't just be
      re-run with a different <code className="text-[#cea86f]">API_URL</code> for staging vs production — the
      value is already frozen inside the compiled files. The two working fixes are building a separate image per
      environment, or having the frontend fetch a small runtime-config JSON file that the container serves
      alongside the static assets, instead of relying on build-time env vars for anything that changes between
      environments.
    </p>
  </div>
)

export const ConfigAndSecretsSection = () => (
  <SectionShell
    title="Config & Secrets"
    paragraphs={[
      'Hardcoding a database URL or API key into an image is a mistake for two reasons: it leaks the credential into version control and the image registry, and it means a new image is needed for every environment. Kubernetes solves this with ConfigMaps for plain config and Secrets for sensitive values, both injected into a Pod at start time.',
      'The backend and frontend don\'t get to use this the same way, and that difference is worth understanding before it causes a confusing production bug.',
    ]}
  >
    <div className="space-y-6">
      <ConfigMapSecretSection />
      <RuntimeVsBuildDiagram />
      <FrontendGotchaSection />
    </div>
  </SectionShell>
)
