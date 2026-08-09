import { CodeBlock, SectionShell, StepList } from '../Shared'

const StartingAProjectSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Two Ways To Start</span>
    <StepList
      steps={[
        "git init turns the current folder into a brand new, empty Git repository — use it for a project that doesn't exist anywhere else yet",
        "git clone <url> copies an existing repository — history and all — down to your machine, and is by far the more common way any real project starts",
      ]}
    />
    <CodeBlock>{`git init
git clone https://github.com/user/repo.git`}</CodeBlock>
  </div>
)

const DailyLoopSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Daily Loop</span>
    <p className="text-white leading-relaxed text-sm">
      This is the sequence that repeats dozens of times a day on any real project: check what changed, stage the
      parts you actually want in this commit, and record a snapshot with a message explaining why.
    </p>
    <CodeBlock>{`git status                        # what changed since the last commit?
git add index.html style.css      # stage specific files...
git add .                         # ...or everything at once
git commit -m "Add pricing table" # snapshot the staged changes
git log --oneline                 # review the history so far`}</CodeBlock>
  </div>
)

const DiffSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Reading What Changed</span>
    <p className="text-white leading-relaxed text-sm">
      <code className="text-[#cea86f]">git diff</code> is the habit that prevents most bad commits — always know
      exactly what you're about to stage or commit before you do it.
    </p>
    <CodeBlock>{`git diff              # unstaged changes vs. the last commit
git diff --staged     # staged changes vs. the last commit`}</CodeBlock>
  </div>
)

export const GitCoreWorkflowSection = () => (
  <SectionShell
    title="The Core Workflow"
    paragraphs={[
      "Nearly everything else in Git builds on five commands: status, add, commit, diff and log. Get comfortable with these before touching branches or remotes — they're what you'll actually type dozens of times a day.",
    ]}
    points={[
      'Commit small and often: one commit per logical change makes history easy to read, and easy to undo if something in it turns out to be wrong',
      'Write commit messages in the imperative mood ("Add pricing table", not "Added" or "Adds") — it matches how Git itself describes commits',
      "git add is a checkpoint you control: staging lets you build a commit from only part of what you've changed",
    ]}
  >
    <div className="space-y-6">
      <StartingAProjectSection />
      <DailyLoopSection />
      <DiffSection />
    </div>
  </SectionShell>
)
