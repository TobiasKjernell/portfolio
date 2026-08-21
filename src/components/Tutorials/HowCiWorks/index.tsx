import { Arrow, Box, Panel, SectionShell, StepList } from '../Shared'

const CiFlowDiagram = () => (
  <Panel
    label="What Happens on Every Push"
    caption="This whole sequence usually finishes in a few minutes and needs zero human involvement"
  >
    <div className="flex flex-col items-center gap-2 py-2 w-full">
      <Box>Developer pushes a commit</Box>
      <Arrow />
      <Box>CI server detects the push, checks out the code</Box>
      <Arrow />
      <Box>Installs dependencies</Box>
      <Arrow />
      <Box>Builds the project (compile / bundle)</Box>
      <Arrow />
      <Box>Runs the automated test suite</Box>
      <Arrow />
      <Box className="border-green-500/60">Reports pass/fail back on the commit or pull request</Box>
    </div>
  </Panel>
)

const WhyItMattersSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Why "Automated" Is the Whole Point</span>
    <p className="text-white leading-relaxed text-sm">
      Every one of those steps could be done by a human — someone could pull the latest code, run the tests
      locally, and eyeball the results. People do skip that, forget to run a test file, or run it against the
      wrong branch. A CI server does the exact same steps, the exact same way, every single time, for every single
      commit, without getting tired or in a hurry near the end of the day. That consistency is what lets a team
      trust a green checkmark instead of trusting a person's memory.
    </p>
  </div>
)

const KeyIdeasSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Two Habits That Make CI Actually Work</span>
    <StepList
      steps={[
        'Commit small and often — a change that touches 20 lines is easy to test and easy to blame if it breaks something; a change that touches 2,000 lines is neither',
        'Never merge on a red build — most teams configure their CI server to physically block merging a pull request until the pipeline passes, so a broken build can\'t sneak into the shared branch',
      ]}
    />
  </div>
)

export const HowCiWorksSection = () => (
  <SectionShell
    title="How Continuous Integration Works"
    paragraphs={[
      'Continuous Integration is the "CI" half — it\'s the practice of merging code into a shared branch frequently, with every merge automatically built and tested by a CI server (GitHub Actions, GitLab CI, Jenkins, and others all do this job).',
      'The goal isn\'t just "run the tests" — it\'s to catch a mistake within minutes of it being written, while the person who wrote it still remembers exactly what they changed, instead of weeks later when three other people have built on top of it.',
    ]}
  >
    <div className="space-y-6">
      <CiFlowDiagram />
      <WhyItMattersSection />
      <KeyIdeasSection />
    </div>
  </SectionShell>
)
