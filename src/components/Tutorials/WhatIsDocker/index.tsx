import { Box, Panel, SectionShell } from '../Shared'

const DockerSimpleSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Simple Version</span>
    <p className="text-white leading-relaxed text-sm">
      Before shipping containers existed, moving cargo overseas meant loading loose barrels, crates and sacks by
      hand, and every port needed different equipment for every different kind of cargo. The shipping container
      fixed that: a standard steel box that fits the same crane, the same truck bed and the same ship slot
      everywhere in the world, no matter what's actually inside it. Docker does the same thing for software —
      instead of shipping code that only runs correctly on your machine ("works on my machine"), you package the
      app plus everything it needs — runtime, dependencies, config — into one standard container image that runs
      identically on your laptop, a teammate's laptop, or a server on the other side of the world.
    </p>
  </div>
)

const VmVsContainerDiagram = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Panel label="Virtual Machine" caption="Each VM ships a full guest OS underneath your app — heavy, and slow to start">
      <div className="flex flex-col gap-2 w-full">
        <Box>App</Box>
        <Box>Guest OS</Box>
        <Box>Hypervisor</Box>
        <Box>Host OS</Box>
      </div>
    </Panel>
    <Panel label="Container" caption="Containers share the host's OS kernel — just the app and its dependencies, boots in seconds">
      <div className="flex flex-col gap-2 w-full">
        <Box>App</Box>
        <Box>Container Runtime (Docker)</Box>
        <Box>Host OS</Box>
      </div>
    </Panel>
  </div>
)

const WhyFullstackCaresSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Why This Matters Once There's a Backend</span>
    <p className="text-white leading-relaxed text-sm">
      A pure static frontend barely needs Docker — it's just files. The moment a backend and a database enter the
      picture, "works on my machine" turns into three separate problems at once: your Node version might not
      match production's, your teammate's Postgres might be a different major version than yours, and setting all
      of that up on a new laptop can eat half a day. Docker collapses all three into "clone the repo, run one
      command" — every piece of the stack runs in its own container, using the exact same image every time,
      everywhere.
    </p>
  </div>
)

export const WhatIsDockerSection = () => (
  <SectionShell
    title="What Is Docker"
    paragraphs={[
      'Docker packages an application and everything it needs to run — runtime, dependencies, config — into a single, portable image. A container is just a running instance of that image, isolated from everything else on the machine but sharing the host\'s OS kernel instead of virtualizing a whole new one.',
      'That isolation is what makes Docker so useful for a full stack: the frontend, the backend API and the database can each run in their own container, with their own dependencies, without ever fighting over versions on the host machine.',
    ]}
    points={[
      'Image: a frozen, reusable snapshot — built once from a Dockerfile, shared and versioned like any other artifact',
      'Container: a live, running instance of an image — you can start several containers from the exact same image',
      'Isolation without a full guest OS is what makes containers start in seconds instead of minutes, unlike a traditional virtual machine',
    ]}
  >
    <div className="space-y-6">
      <DockerSimpleSection />
      <VmVsContainerDiagram />
      <WhyFullstackCaresSection />
    </div>
  </SectionShell>
)
