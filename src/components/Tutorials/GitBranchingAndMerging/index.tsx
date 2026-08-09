import { CodeBlock, ProsConsCard, SectionShell, StepList } from '../Shared'

const BranchGraphSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">A Branch Is Just A Pointer</span>
    <p className="text-white leading-relaxed text-sm">
      A branch isn't a copy of the project — it's a lightweight, movable label pointing at one commit.{' '}
      <code className="text-[#cea86f]">HEAD</code> tracks whichever branch you're currently on, which is why
      switching branches is instant even on a huge repository.
    </p>
    <CodeBlock>{`main:      A---B---C-----------M
                    \\         /
feature:             D---E---'`}</CodeBlock>
    <p className="text-gray-400 text-sm leading-relaxed">
      Commit <span className="text-[#cea86f]">D</span> and <span className="text-[#cea86f]">E</span> happen on{' '}
      <span className="text-[#cea86f]">feature</span> without touching <span className="text-[#cea86f]">main</span>{' '}
      at all — merging at <span className="text-[#cea86f]">M</span> is the one moment the two lines of work come
      back together.
    </p>
  </div>
)

const WorkflowSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Branch, Work, Merge</span>
    <StepList
      steps={[
        'git switch -c feature/login creates a new branch off the current one and switches to it in a single step',
        "Commit as usual — every commit made now belongs only to feature/login, main doesn't see it yet",
        'git switch main goes back, then git merge feature/login brings the work in',
        "git branch -d feature/login deletes the branch once it's merged — the commits themselves live on in main's history",
      ]}
    />
    <CodeBlock>{`git branch                     # list local branches
git switch -c feature/login    # create + switch to a new branch
git add .
git commit -m "Add login form"
git switch main
git merge feature/login
git branch -d feature/login    # safe to delete, it's merged in`}</CodeBlock>
  </div>
)

const CheckoutSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">git checkout — The Classic All-In-One</span>
    <p className="text-white leading-relaxed text-sm">
      Before <code className="text-[#cea86f]">switch</code> and <code className="text-[#cea86f]">restore</code>{' '}
      existed, <code className="text-[#cea86f]">checkout</code> did every job above on its own — and it's still
      everywhere in older docs, tutorials and other people's muscle memory, so it's worth recognizing even if you
      reach for the newer commands day to day.
    </p>
    <CodeBlock>{`git checkout main               # switch branches
git checkout -b feature/login   # create + switch, one step
git checkout -- style.css       # discard uncommitted changes to one file
git checkout a1b2c3d            # check out a specific commit directly`}</CodeBlock>
    <p className="text-gray-400 text-sm leading-relaxed">
      That last form drops you into a <span className="text-[#cea86f]">detached HEAD</span> — you're no longer
      "on" a branch, just looking at exactly how the project appeared at that commit. It's a completely safe way
      to browse old history; just branch off first (
      <code className="text-[#cea86f]">git checkout -b old-fix</code>) before committing anything there, or the
      new commits become hard to find again without <code className="text-[#cea86f]">git reflog</code>.
    </p>
  </div>
)

const MergeStrategiesSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <ProsConsCard
      title="Fast-Forward Merge"
      pros={[
        "Keeps history perfectly linear — no extra commit, easy to read",
        'Happens automatically whenever main has no new commits since the branch was created',
      ]}
      cons={[
        "Only possible if main hasn't moved on — otherwise Git falls back to a real merge",
        "Loses the visual grouping that shows 'these commits were one feature'",
      ]}
    />
    <ProsConsCard
      title="Merge Commit (--no-ff)"
      pros={[
        'Always works, even when main has moved on since the branch started',
        'The merge commit marks exactly where a feature was integrated — useful on a team',
      ]}
      cons={[
        'History gains an extra commit and a visible branch line for every merge',
        'Can get noisy with many small, short-lived branches',
      ]}
    />
  </div>
)

export const GitBranchingAndMergingSection = () => (
  <SectionShell
    title="Branching & Merging"
    paragraphs={[
      "Branches are what make Git safe to experiment with — new work happens in isolation, and main stays untouched until you're ready to bring it in.",
    ]}
  >
    <div className="space-y-6">
      <BranchGraphSection />
      <WorkflowSection />
      <CheckoutSection />
      <MergeStrategiesSection />
    </div>
  </SectionShell>
)
