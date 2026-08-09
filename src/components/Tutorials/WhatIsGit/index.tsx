import { Arrow, Box, Panel, SectionShell } from '../Shared'

const GitSimpleSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Simple Version</span>
    <p className="text-white leading-relaxed text-sm">
      Think of Git as a save-game system for a project. Every <span className="text-[#cea86f]">commit</span> is a
      checkpoint you can always come back to — nothing is really lost as long as it got committed at some point.
      Because every clone carries the entire history, you can commit, branch, and dig through old versions
      completely offline; nothing you do locally touches anyone else's copy until you explicitly choose to share
      it.
    </p>
  </div>
)

const ThreeAreasDiagram = () => (
  <Panel
    label="From Edit To Shared History"
    caption="Nothing you edit is 'in Git' until it's staged, and nothing staged is permanent until it's committed"
  >
    <div className="flex flex-col items-center gap-1 py-2 w-full">
      <Box className="w-full">Working Directory — the files you're editing</Box>
      <span className="text-[10px] text-gray-500">git add</span>
      <Arrow />
      <Box className="w-full">Staging Area — changes queued for the next commit</Box>
      <span className="text-[10px] text-gray-500">git commit</span>
      <Arrow />
      <Box className="w-full">Local Repository (.git) — permanent, versioned history</Box>
      <span className="text-[10px] text-gray-500">git push</span>
      <Arrow />
      <Box className="w-full">Remote Repository — GitHub, GitLab, etc.</Box>
    </div>
  </Panel>
)

export const WhatIsGitSection = () => (
  <SectionShell
    title="What Is Git"
    paragraphs={[
      "Git is a distributed version control system: it tracks the history of a project as a series of snapshots, and lets any number of people work on that history in parallel without stepping on each other.",
      "\"Distributed\" is the key word — there's no single master copy that everything depends on. Every clone of a repository holds the full history, so committing, branching, and browsing old versions all work without a network connection at all.",
    ]}
    points={[
      'Snapshot, not diff: each commit is a full snapshot of the whole project at that moment — Git just stores the underlying data efficiently so this stays cheap',
      "Three areas, one file at a time: a change moves from your working directory, to the staging area, to the local repository — you're always in control of exactly what goes into the next commit",
      "Local first: commits, branches and history all live on your machine — a push is the one deliberate step where local work becomes shared work",
    ]}
  >
    <div className="space-y-6">
      <GitSimpleSection />
      <ThreeAreasDiagram />
    </div>
  </SectionShell>
)
