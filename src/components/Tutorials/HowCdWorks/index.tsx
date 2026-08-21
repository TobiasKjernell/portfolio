import { Arrow, Box, Panel, ProsConsCard, SectionShell } from '../Shared'

const CdSpectrumDiagram = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Panel
      label="Continuous Delivery"
      caption="A human still presses the button — CI/CD guarantees the button is always safe to press"
    >
      <div className="flex flex-col gap-2 w-full">
        <Box>CI passes</Box>
        <Arrow />
        <Box>Build packaged, ready to release</Box>
        <Arrow />
        <Box className="border-[#cea86f]/60">Human clicks "Deploy"</Box>
        <Arrow />
        <Box>Live in production</Box>
      </div>
    </Panel>
    <Panel
      label="Continuous Deployment"
      caption="No manual gate at all — the tests themselves are the only thing standing between a commit and production"
    >
      <div className="flex flex-col gap-2 w-full">
        <Box>CI passes</Box>
        <Arrow />
        <Box>Build packaged</Box>
        <Arrow />
        <Box className="border-green-500/60">Deploys automatically, no click</Box>
        <Arrow />
        <Box>Live in production</Box>
      </div>
    </Panel>
  </div>
)

const CdCardsSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ProsConsCard
      title="Continuous Delivery"
      pros={[
        'A person decides exactly when a release goes out — useful around business hours, marketing launches or support readiness',
        'Still forces every change to be release-ready at all times, which is most of the real benefit',
        'Easier sell to a team or client nervous about full automation',
      ]}
      cons={[
        'Someone has to remember to actually click deploy — builds can quietly pile up unreleased',
        'The manual click reintroduces a small human bottleneck back into the process',
      ]}
    />
    <ProsConsCard
      title="Continuous Deployment"
      pros={[
        'Fastest possible feedback loop — a fix or feature can be live minutes after being written',
        'Removes the temptation to batch up several unrelated changes into one release',
        'No release becomes "special" or scary, because every release looks exactly the same',
      ]}
      cons={[
        'Demands a genuinely trustworthy test suite — a false-positive green build ships straight to real users',
        'Not every kind of change is a good fit — pricing changes or anything needing a coordinated announcement usually still wants a gate',
      ]}
    />
  </div>
)

export const HowCdWorksSection = () => (
  <SectionShell
    title="Delivery vs Deployment"
    paragraphs={[
      'Both halves of "CD" start the same way — CI passes, and the change is built into a deployable artifact, like a Docker image or a compiled bundle. Where they differ is what happens next.',
      'Continuous Delivery stops one step short of production: the release is packaged and proven, sitting ready, waiting for a human to say "go." Continuous Deployment removes that last human step entirely — a green pipeline is the only approval a change needs.',
    ]}
    points={[
      "Delivery answers: \"could we release this right now if we wanted to?\" — always yes",
      'Deployment answers: "did we just release this?" — also always yes, automatically',
      "Most teams start with Continuous Delivery and graduate to Continuous Deployment once they trust their test suite enough to remove the manual click",
    ]}
  >
    <div className="space-y-6">
      <CdSpectrumDiagram />
      <CdCardsSection />
    </div>
  </SectionShell>
)
