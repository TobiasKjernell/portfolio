import { Box, Panel, SectionShell } from '../Shared'

const StagesDiagram = () => (
  <Panel
    label="A Typical Pipeline"
    caption="Stages run left to right in order — but jobs inside one stage (like different test suites) can run in parallel to save time"
  >
    <div className="flex flex-col items-center gap-2 py-2 w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
        <Box>Source</Box>
        <Box>Build</Box>
        <Box>Test</Box>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
        <Box>Package</Box>
        <Box className="border-[#cea86f]/60">Deploy: Staging</Box>
        <Box className="border-green-500/60">Deploy: Production</Box>
      </div>
    </div>
  </Panel>
)

const StagesExplainedSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">What Each Stage Actually Does</span>
    <ul className="space-y-2">
      {[
        'Source: the trigger — a push, a merged pull request, or a scheduled time kicks the whole pipeline off',
        'Build: turn source code into something runnable — install dependencies, compile TypeScript, bundle a frontend, or build a Docker image',
        'Test: run automated checks — unit tests are fast and check small pieces in isolation, integration tests check pieces working together, and end-to-end tests drive the app like a real user would',
        'Package: produce one immutable, versioned artifact — a Docker image tagged with the commit hash is the most common example — so exactly what was tested is exactly what gets deployed',
        'Deploy (staging): release the artifact to a copy of production first, for a final sanity check or for QA to click through',
        'Deploy (production): release the same, already-tested artifact to real users',
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

const EnvironmentsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Environments: Where the Pipeline Actually Deploys To</span>
    <p className="text-white leading-relaxed text-sm">
      An "environment" is just a separate running copy of the app, kept apart from the others so a mistake in one
      can't touch the rest. Most teams run at least two: staging (sometimes called "dev" or "test"), which mirrors
      production but is safe to break, and production, which is what real users actually see. Some teams add a
      preview environment too — a temporary, throwaway deployment spun up for a single pull request, so a reviewer
      can click around the actual change instead of just reading the diff.
    </p>
  </div>
)

export const CiCdPipelineAnatomySection = () => (
  <SectionShell
    title="Anatomy of a Pipeline"
    paragraphs={[
      "A pipeline is just a checklist a robot runs on every change, described as a series of stages. Different teams name and split the stages differently, but almost every real-world pipeline is some version of the same six steps.",
      "The important part isn't memorizing the names — it's the ordering: nothing gets packaged before it's tested, and nothing reaches production before it's proven itself in an earlier stage first.",
    ]}
  >
    <div className="space-y-6">
      <StagesDiagram />
      <StagesExplainedSection />
      <EnvironmentsSection />
    </div>
  </SectionShell>
)
