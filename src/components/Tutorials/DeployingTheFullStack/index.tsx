import { Arrow, Box, CodeBlock, Panel, SectionShell, StepList } from '../Shared'

const ArchitectureDiagram = () => (
  <Panel
    label="The Full Picture"
    caption="One Ingress splits traffic by path — the frontend and backend each scale independently behind their own Service"
  >
    <div className="flex flex-col items-center gap-2 py-2 w-full">
      <Box>Client (Browser)</Box>
      <Arrow />
      <Box>Ingress — "/" → frontend, "/api" → backend</Box>
      <div className="grid grid-cols-2 gap-6 w-full max-w-[420px] mt-2">
        <div className="flex flex-col items-center gap-2">
          <Box>Service: frontend</Box>
          <Arrow />
          <Box>Pods ×3</Box>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Box>Service: backend</Box>
          <Arrow />
          <Box>Pods ×3</Box>
        </div>
      </div>
      <Arrow />
      <Box className="border-green-500/60">Managed database (outside the cluster)</Box>
    </div>
  </Panel>
)

const ManifestsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Manifests</span>
    <p className="text-white leading-relaxed text-sm">
      Each piece gets a Deployment (what to run, how many copies) and a Service (how to reach it). The frontend
      and backend are otherwise near-identical — only the image, port and replica count differ:
    </p>
    <CodeBlock label="frontend-deployment.yaml">{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: my-frontend:latest
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: frontend
spec:
  selector:
    app: frontend
  ports:
    - port: 80
      targetPort: 80`}</CodeBlock>
    <CodeBlock label="backend-deployment.yaml">{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
        - name: backend
          image: my-backend:latest
          ports:
            - containerPort: 4000
          envFrom:
            - configMapRef:
                name: backend-config
            - secretRef:
                name: backend-secret
---
apiVersion: v1
kind: Service
metadata:
  name: backend
spec:
  selector:
    app: backend
  ports:
    - port: 4000
      targetPort: 4000`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      One Ingress ties both Services together behind a single hostname, routing by path:
    </p>
    <CodeBlock label="ingress.yaml">{`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
spec:
  rules:
    - host: myapp.example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: backend
                port:
                  number: 4000
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend
                port:
                  number: 80`}</CodeBlock>
  </div>
)

const CommandsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Shipping It</span>
    <StepList
      steps={[
        'kubectl apply -f . sends every manifest in the folder to the cluster in one go — Kubernetes reconciles from there',
        'kubectl get pods -l app=backend filters down to just the backend\'s Pods, useful once there are a dozen Pods running',
        'kubectl scale deployment backend --replicas=6 handles a traffic spike on just the backend, without touching the frontend',
        'kubectl rollout status deployment backend watches a new image roll out a few Pods at a time, confirming zero downtime along the way',
      ]}
    />
    <CodeBlock>{`kubectl apply -f .
kubectl get pods -l app=backend
kubectl scale deployment backend --replicas=6
kubectl rollout status deployment backend`}</CodeBlock>
  </div>
)

export const DeployingTheFullStackSection = () => (
  <SectionShell
    title="Deploying the Full Stack"
    paragraphs={[
      'With Docker images built and config/secrets in place, the last step is describing the whole stack to Kubernetes: a Deployment and Service for the frontend, the same for the backend, and one Ingress splitting traffic between them by path.',
      'The database stays out of this picture entirely if it\'s managed externally, as recommended earlier — the backend just needs its connection string, wherever that database actually lives.',
    ]}
  >
    <div className="space-y-6">
      <ArchitectureDiagram />
      <ManifestsSection />
      <CommandsSection />
    </div>
  </SectionShell>
)
