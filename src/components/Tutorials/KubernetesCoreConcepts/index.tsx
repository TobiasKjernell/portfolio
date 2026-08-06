import { Arrow, Box, Panel, SectionShell } from '../Shared'

const K8sConceptsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Four Building Blocks</span>
    <ul className="space-y-2">
      {[
        'Pod: the smallest deployable unit — usually just one running container, wrapped with a bit of metadata Kubernetes uses to track it',
        'Deployment: describes the desired state for a set of Pods — "run this image, keep 3 replicas alive at all times" — and handles rolling updates when you change it',
        'Service: a stable internal address that load-balances traffic across whichever Pods are currently healthy, even as individual Pods are replaced',
        'Ingress: routes external traffic (real browser requests) in to the right Service, based on hostname or URL path — the front door of the cluster',
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
  </div>
)

const K8sRequestFlowDiagram = () => (
  <Panel
    label="Request Flow: Browser to Pod"
    caption="Two layers of indirection sit between the client and any single Pod, so no Pod is ever depended on directly"
  >
    <div className="flex flex-col items-center gap-2 py-2 w-full">
      <Box>Client (Browser)</Box>
      <Arrow />
      <Box>Ingress — routes by hostname / path</Box>
      <Arrow />
      <Box>Service — stable address, load-balances across Pods</Box>
      <Arrow />
      <div className="grid grid-cols-3 gap-2 w-full max-w-[300px]">
        <Box>Pod 1</Box>
        <Box>Pod 2</Box>
        <Box>Pod 3</Box>
      </div>
    </div>
  </Panel>
)

const K8sSelfHealingDiagram = () => (
  <Panel
    label="Self-Healing in Action"
    caption="The Deployment controller keeps comparing actual state to desired state and corrects any drift"
  >
    <div className="flex flex-col items-center gap-3 py-2 w-full">
      <Box>Deployment: desired = 3 replicas</Box>
      <div className="grid grid-cols-3 gap-2 w-full max-w-[300px]">
        <Box>Pod 1</Box>
        <Box className="border-red-400/60 text-red-400/80">Pod 2 — crashed</Box>
        <Box>Pod 3</Box>
      </div>
      <span className="text-[10px] text-gray-400">Kubernetes sees 2/3 running and starts a replacement</span>
      <div className="grid grid-cols-3 gap-2 w-full max-w-[300px]">
        <Box>Pod 1</Box>
        <Box className="border-green-500/60">Pod 2 — restarted</Box>
        <Box>Pod 3</Box>
      </div>
    </div>
  </Panel>
)

export const KubernetesCoreConceptsSection = () => (
  <SectionShell
    title="Kubernetes Core Concepts"
    paragraphs={[
      'Everything in Kubernetes is described declaratively, using four building blocks that stack on top of each other: Pods run your containers, Deployments keep the right number of Pods alive, Services give them a stable address, and Ingress lets the outside world in.',
      'A fullstack app typically gets one Deployment and Service per piece — frontend, backend — sharing one Ingress that routes by path, plus a separate story entirely for the database (covered next).',
    ]}
  >
    <div className="space-y-6">
      <K8sConceptsSection />
      <K8sRequestFlowDiagram />
      <K8sSelfHealingDiagram />
    </div>
  </SectionShell>
)
