import { Arrow, Box, Panel, SectionShell } from '../Shared'

const SimpleVersionSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Simple Version</span>
    <p className="text-white leading-relaxed text-sm">
      Imagine every developer on a team writes code for two weeks in total isolation, then everyone tries to merge
      their changes together on a Friday afternoon. Nothing lines up, nobody remembers why they made a change, and
      the release slips into the weekend. CI/CD is the antidote to that scenario: instead of one terrifying merge
      and one terrifying release, a robot checks every small change the moment it happens, and — if a team wants
      it — ships that change out to users automatically once it's proven safe. "CI/CD" is really two related
      ideas glued together: Continuous Integration keeps everyone's code merged and tested constantly, and
      Continuous Delivery/Deployment keeps a tested build ready — or already shipped — to real users at all times.
    </p>
  </div>
)

const BeforeAfterDiagram = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Panel
      label="Without CI/CD"
      caption="Big, infrequent, manual releases — every merge is a gamble and every release is an event"
    >
      <div className="flex flex-col gap-2 w-full">
        <Box>Code for weeks, alone</Box>
        <Arrow />
        <Box>One giant merge</Box>
        <Arrow />
        <Box className="border-red-400/60 text-red-400/80">Manual testing, manual deploy</Box>
      </div>
    </Panel>
    <Panel
      label="With CI/CD"
      caption="Small changes, tested and released constantly — problems are caught while they're still tiny"
    >
      <div className="flex flex-col gap-2 w-full">
        <Box>Small commit</Box>
        <Arrow />
        <Box>Automated build + test</Box>
        <Arrow />
        <Box className="border-green-500/60">Automated release</Box>
      </div>
    </Panel>
  </div>
)

export const WhatIsCiCdSection = () => (
  <SectionShell
    title="What Is CI/CD"
    paragraphs={[
      'CI/CD stands for Continuous Integration and Continuous Delivery (or Deployment) — a set of practices, backed by automation, for getting code changes from a developer\'s laptop into production safely, in small steps, all the time, instead of in big, risky batches.',
      "It's not one single tool. It's a pipeline — a sequence of automated steps — that runs every time code changes, made up of whichever stages a team needs: build the code, run the tests, package it, and optionally ship it.",
    ]}
    points={[
      'Continuous Integration (CI): every developer merges small changes often, and a robot automatically builds and tests each one — catching bugs within minutes, not weeks',
      'Continuous Delivery (CD): every change that passes CI is automatically packaged into a build that is always ready to release, on demand, with one click',
      'Continuous Deployment (also CD): the stricter sibling — every change that passes CI is released to production automatically, with no human click at all',
      'The word "continuous" doesn\'t mean "constant deploys happening every second" — it means the process never stops running in the background, on every single change',
    ]}
  >
    <div className="space-y-6">
      <SimpleVersionSection />
      <BeforeAfterDiagram />
    </div>
  </SectionShell>
)
