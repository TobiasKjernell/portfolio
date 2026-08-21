import { Box, Panel, SectionShell } from '../Shared'

const RollingDiagram = () => (
  <Panel
    label="Rolling Deployment"
    caption="Old and new versions run side by side briefly, until every instance is replaced — the default in Kubernetes"
  >
    <div className="flex flex-col items-center gap-2 py-2 w-full">
      <div className="grid grid-cols-3 gap-2 w-full max-w-[320px]">
        <Box className="border-green-500/60">v2</Box>
        <Box>v1</Box>
        <Box>v1</Box>
      </div>
      <span className="text-[10px] text-gray-400">one instance at a time is swapped for the new version</span>
      <div className="grid grid-cols-3 gap-2 w-full max-w-[320px]">
        <Box className="border-green-500/60">v2</Box>
        <Box className="border-green-500/60">v2</Box>
        <Box>v1</Box>
      </div>
    </div>
  </Panel>
)

const BlueGreenDiagram = () => (
  <Panel
    label="Blue-Green Deployment"
    caption="Two full, identical environments — traffic flips from one to the other in a single instant"
  >
    <div className="flex flex-col items-center gap-2 py-2 w-full">
      <div className="grid grid-cols-2 gap-3 w-full max-w-[320px]">
        <Box className="border-green-500/60">Blue (v1) — live traffic</Box>
        <Box>Green (v2) — idle, fully deployed</Box>
      </div>
      <span className="text-[10px] text-gray-400">router flips all traffic to Green in one step</span>
      <div className="grid grid-cols-2 gap-3 w-full max-w-[320px]">
        <Box>Blue (v1) — idle, kept as instant rollback</Box>
        <Box className="border-green-500/60">Green (v2) — live traffic</Box>
      </div>
    </div>
  </Panel>
)

const CanaryDiagram = () => (
  <Panel
    label="Canary Deployment"
    caption="The new version earns more traffic gradually, only after proving itself with a small slice of real users first"
  >
    <div className="flex flex-col items-center gap-2 py-2 w-full">
      <Box>v1 — 95% of traffic</Box>
      <Box className="border-[#cea86f]/60">v2 — 5% of traffic (the "canary")</Box>
      <span className="text-[10px] text-gray-400">error rates and metrics are watched before increasing that split</span>
    </div>
  </Panel>
)

const StrategiesExplainedSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Choosing Between Them</span>
    <ul className="space-y-2">
      {[
        'Rolling: the simplest and most common default — cheap (no duplicate environment) but a rollback means rolling forward again, instance by instance, which takes a little time',
        'Blue-Green: instant rollback, since the old environment is left running and untouched — the tradeoff is paying for double the infrastructure while both exist',
        'Canary: the safest option for catching a bad release before it hits everyone, but the most complex to set up — it needs real traffic-splitting and metrics to watch automatically',
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

export const DeploymentStrategiesSection = () => (
  <SectionShell
    title="Deployment Strategies"
    paragraphs={[
      "The last stage of a pipeline — actually releasing the new version — still needs a strategy of its own. The naive approach, stopping the old version and starting the new one, means real downtime while the swap happens.",
      "These three strategies all solve that same problem — releasing with zero downtime, and a safe way back out if something's wrong — with different tradeoffs between cost, complexity and how gradually the new version is trusted.",
    ]}
  >
    <div className="space-y-6">
      <RollingDiagram />
      <BlueGreenDiagram />
      <CanaryDiagram />
      <StrategiesExplainedSection />
    </div>
  </SectionShell>
)
