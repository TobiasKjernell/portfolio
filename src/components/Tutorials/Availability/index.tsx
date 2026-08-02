import { Box, Panel, SectionShell } from '../Shared'

const AvailabilityDiagram = () => (
  <Panel label="Redundant Instances" caption="One instance fails — traffic simply routes around it">
    <div className="flex flex-col items-center gap-2 py-2 w-full">
      <Box>Client</Box>
      <div className="grid grid-cols-3 gap-4 w-full max-w-[260px] text-center text-lg leading-none">
        <span className="gold-text">↓</span>
        <span className="text-red-500/70">✕</span>
        <span className="gold-text">↓</span>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full max-w-[260px]">
        <Box>Server A</Box>
        <Box className="border-red-500/50 text-red-400/80">Server B</Box>
        <Box>Server C</Box>
      </div>
    </div>
  </Panel>
)

export const AvailabilitySection = () => (
  <SectionShell
    title="Availability & Reliability"
    paragraphs={[
      'Availability is the percentage of time a system is operational, usually expressed in "nines" (99.9%, 99.99%...). Reliability is whether it produces correct results consistently.',
      'Both are achieved primarily through redundancy — running multiple instances of every critical component so that the failure of one does not take down the whole system — combined with health checks and automatic failover.',
    ]}
  >
    <AvailabilityDiagram />
  </SectionShell>
)
