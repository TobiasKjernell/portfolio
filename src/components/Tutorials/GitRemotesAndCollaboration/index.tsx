import { Arrow, Box, CodeBlock, Panel, SectionShell } from '../Shared'

const RemoteDiagram = () => (
  <Panel
    label="Local ↔ Remote"
    caption="origin/main is a read-only bookmark — it only moves when you fetch or pull, never on its own"
  >
    <div className="flex flex-col items-center gap-1 py-2 w-full">
      <Box className="w-full">Local Repository — your commits</Box>
      <span className="text-[10px] text-gray-500">git fetch</span>
      <Arrow />
      <Box className="w-full">origin/main — last known state of the remote</Box>
      <span className="text-[10px] text-gray-500">git push</span>
      <Arrow />
      <Box className="w-full">Remote Repository — GitHub, GitLab, etc.</Box>
    </div>
  </Panel>
)

const RemoteCommandsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Everyday Commands</span>
    <CodeBlock>{`git clone https://github.com/user/repo.git
git remote -v                  # see which URLs origin points to
git fetch origin               # download new commits, don't touch my branches
git pull origin main           # fetch + merge into the current branch, in one step
git push origin feature/login  # publish a branch so others can see it`}</CodeBlock>
  </div>
)

const FetchVsPullSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">fetch vs. pull</span>
    <p className="text-white leading-relaxed text-sm">
      <code className="text-[#cea86f]">git fetch</code> is the safe one — it downloads whatever changed on the
      remote and updates <code className="text-[#cea86f]">origin/main</code>, but never touches the branch you're
      actually on. <code className="text-[#cea86f]">git pull</code> is just fetch immediately followed by a merge,
      which is convenient but can drop an unreviewed merge — or a conflict — right into the middle of your work.
      When in doubt, fetch first and look at what changed before merging.
    </p>
  </div>
)

const PullRequestsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Pull Requests</span>
    <p className="text-white leading-relaxed text-sm">
      Pushing a branch doesn't merge it into anything — it just makes it visible on the remote. A pull request
      (or merge request) is the wrapper around that branch that lets teammates review the diff, leave comments,
      and run automated checks before the work ever reaches main. It's the collaboration layer GitHub and GitLab
      add on top of plain Git.
    </p>
  </div>
)

export const GitRemotesAndCollaborationSection = () => (
  <SectionShell
    title="Working With Remotes"
    paragraphs={[
      'A remote is just a name — usually "origin" — that points at another copy of the repository, most often one hosted on GitHub or GitLab. Everything covered so far works with zero network access; remotes are the one part of Git that requires it.',
    ]}
  >
    <div className="space-y-6">
      <RemoteDiagram />
      <RemoteCommandsSection />
      <FetchVsPullSection />
      <PullRequestsSection />
    </div>
  </SectionShell>
)
