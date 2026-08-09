import { CodeBlock, ProsConsCard, SectionShell } from '../Shared'

const GoldenRuleSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Golden Rule</span>
    <p className="text-white leading-relaxed text-sm">
      Git almost never deletes anything for real. As long as something was committed or stashed at some point, it
      can be recovered — the only genuinely dangerous zone is uncommitted, unstashed changes sitting in the
      working directory. Everything below is ordered from "completely safe" to "know what you're doing first."
    </p>
  </div>
)

const StashSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">git stash — Shelve, Don't Lose</span>
    <p className="text-white leading-relaxed text-sm">
      Need to switch branches but you're mid-change and not ready to commit? Stashing puts those changes aside
      without a commit, leaving a clean working directory — pop them back whenever you're ready.
    </p>
    <CodeBlock>{`git stash                 # shelve uncommitted changes
git switch main
git pull
git switch feature/login
git stash pop             # bring the changes back`}</CodeBlock>
  </div>
)

const RevertVsResetSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <ProsConsCard
      title="git revert"
      pros={[
        'Safe on shared or already-pushed branches — it never rewrites history',
        'Leaves a clear record in the log that something was undone, and why',
      ]}
      cons={['Adds a new commit instead of erasing the old one, so history isn\'t "clean"']}
    />
    <ProsConsCard
      title="git reset"
      pros={[
        'Cleans up messy local commits before they\'re ever pushed',
        '--soft keeps changes staged, --mixed unstages them, --hard discards them entirely',
      ]}
      cons={[
        'Rewrites history — never use on a branch anyone else has already pulled',
        '--hard permanently discards uncommitted changes with no confirmation prompt',
      ]}
    />
  </div>
)

const ReflogSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">git reflog — The Safety Net</span>
    <p className="text-white leading-relaxed text-sm">
      Even after a <code className="text-[#cea86f]">reset --hard</code> that looks like it wiped out a commit,
      Git keeps a log of everywhere <code className="text-[#cea86f]">HEAD</code> has pointed — recoverable for
      months. This is the command to remember when something feels "lost."
    </p>
    <CodeBlock>{`git reset --hard HEAD~1   # the last commit looks gone
git reflog                # ...but it's still right here
git reset --hard <sha>    # jump back to it`}</CodeBlock>
  </div>
)

export const GitSafeUndoToolkitSection = () => (
  <SectionShell
    title="The Safe Undo Toolkit"
    paragraphs={[
      'Mistakes are routine in Git — the goal is knowing which undo tool matches the situation, so fixing a mistake never risks creating a bigger one.',
    ]}
    points={[
      'git status and git diff first, always — know exactly what you\'re about to touch before you touch it',
      'git restore <file> discards uncommitted changes to one file — fine for a truly unwanted edit, but there\'s no confirmation, so diff first (the older git checkout -- <file> does the same thing)',
      'git commit --amend fixes the very last commit before it\'s pushed — a typo\'d message or a forgotten file',
      'Rule of thumb: revert on anything shared or already pushed, reset only on local commits nobody else has seen yet',
    ]}
  >
    <div className="space-y-6">
      <GoldenRuleSection />
      <StashSection />
      <RevertVsResetSection />
      <ReflogSection />
    </div>
  </SectionShell>
)
