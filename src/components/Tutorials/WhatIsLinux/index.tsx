import { Arrow, Box, Panel, SectionShell } from '../Shared'

const SimpleVersionSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Simple Version</span>
    <p className="text-white leading-relaxed text-sm">
      Linux is a kernel — the core piece of software that talks directly to the hardware (CPU, memory, disks,
      network card) and hands out access to it safely. On its own, a kernel isn't something you can use day to
      day, so it's always bundled with a huge pile of other software — a shell, core utilities, a package manager,
      sometimes a desktop — into something you can actually install and run. That bundle is called a{' '}
      <span className="gold-text">distribution</span>, or "distro" for short: Ubuntu, Debian, Fedora, Arch and
      countless others are all the same Linux kernel wearing different clothes.
    </p>
    <p className="text-white leading-relaxed text-sm">
      This tutorial uses Ubuntu for every command, since it's the most common distro for both desktops and
      servers, but almost everything here — the commands, permissions, users, SSH — works identically on any
      distro. Only the package manager (<code>apt</code> vs <code>dnf</code> vs <code>pacman</code>) really
      changes.
    </p>
  </div>
)

const StackDiagram = () => (
  <Panel
    label={'What "Linux" Actually Refers To'}
    caption="The kernel is the one constant — everything above it is what makes one distro feel different from another"
  >
    <div className="flex flex-col gap-2 w-full">
      <Box>Hardware — CPU, RAM, disk, network</Box>
      <Arrow />
      <Box className="border-green-500/60">The Linux kernel — manages hardware, processes, memory</Box>
      <Arrow />
      <Box>Core utilities + shell (bash/zsh) + package manager</Box>
      <Arrow />
      <Box>Optional: desktop environment (GNOME, KDE...) — servers skip this entirely</Box>
    </div>
  </Panel>
)

export const WhatIsLinuxSection = () => (
  <SectionShell
    title="What Is Linux"
    paragraphs={[
      "Linux runs almost everything that isn't a personal laptop or phone: nearly every web server, every Android phone under the hood, most of the cloud (AWS, GCP, Azure instances), and most CI/CD runners. Learning to move around it comfortably in a terminal is one of the highest-leverage skills a developer can pick up.",
      "Unlike Windows or macOS, Linux is almost entirely driven through a text interface called a shell — a program that reads commands you type and runs them. This tutorial is about getting comfortable in that shell: the everyday commands, how permissions and users work, how to connect to a remote machine over SSH, and the small habits that make a terminal feel like home instead of a maze.",
    ]}
    points={[
      'Kernel: the core program managing hardware, memory and processes — this part is actually "Linux"',
      'Distro (distribution): a full OS built around the kernel — Ubuntu, Debian, Fedora, Arch, etc.',
      'Shell: the command-line program that interprets what you type — bash is the default on most distros',
      'Terminal: the window/app you type into; it just hosts the shell, it doesn\'t interpret commands itself',
    ]}
  >
    <div className="space-y-6">
      <SimpleVersionSection />
      <StackDiagram />
    </div>
  </SectionShell>
)
