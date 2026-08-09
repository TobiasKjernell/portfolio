import { CodeBlock, SectionShell, StepList } from '../Shared'

const WhyConflictsHappenSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Why It Happens</span>
    <p className="text-white leading-relaxed text-sm">
      A conflict means two branches changed the same lines in different ways, and Git has no way to guess which
      version you actually want. It isn't an error — it's Git correctly refusing to silently pick a winner.
    </p>
  </div>
)

const ConflictMarkersSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">What A Conflict Looks Like</span>
    <p className="text-white leading-relaxed text-sm">
      Git edits the file in place and wraps both versions in markers — everything between{' '}
      <code className="text-[#cea86f]">{'<<<<<<<'}</code> and <code className="text-[#cea86f]">{'======='}</code>{' '}
      is your current branch, everything down to <code className="text-[#cea86f]">{'>>>>>>>'}</code> is the branch
      being merged in.
    </p>
    <CodeBlock label="greeting.ts">{`<<<<<<< HEAD
const greeting = 'Hello there'
=======
const greeting = 'Hi!'
>>>>>>> feature/greeting`}</CodeBlock>
  </div>
)

const ResolveStepsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Resolving It</span>
    <StepList
      steps={[
        'git status lists exactly which files are conflicted',
        'Open each one, decide what the final code should be, and delete the markers entirely — including the lines you didn\'t keep',
        'git add <file> marks that file as resolved',
        'Once every conflicted file is staged, git commit finishes the merge (or git rebase --continue, if you were rebasing)',
      ]}
    />
    <CodeBlock>{`git status
# ...edit the file, remove markers, keep the right code...
git add greeting.ts
git commit                # finishes a merge
git rebase --continue     # finishes a rebase instead

git merge --abort          # bail out completely, back to before the merge started
git rebase --abort`}</CodeBlock>
  </div>
)

const AvoidingConflictsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Fewer Conflicts In The First Place</span>
    <p className="text-white leading-relaxed text-sm">
      Conflicts scale with how long a branch lives and how much it diverges from main. Pulling main into a
      feature branch regularly, keeping branches short-lived, and splitting work by file where possible all keep
      conflicts small and rare instead of huge and rare.
    </p>
  </div>
)

export const GitResolvingConflictsSection = () => (
  <SectionShell
    title="Resolving Merge Conflicts"
    paragraphs={[
      "Conflicts feel alarming the first time, but they're a completely normal, recoverable part of merging — and if the resolution goes wrong, git merge --abort always returns to exactly where you started.",
    ]}
  >
    <div className="space-y-6">
      <WhyConflictsHappenSection />
      <ConflictMarkersSection />
      <ResolveStepsSection />
      <AvoidingConflictsSection />
    </div>
  </SectionShell>
)
