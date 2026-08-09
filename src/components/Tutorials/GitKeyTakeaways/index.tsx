import { SectionShell } from '../Shared'

export const GitKeyTakeawaysSection = () => (
  <SectionShell
    title="Key Takeaways"
    paragraphs={[
      "Git's reputation for being scary mostly comes from a handful of commands used without understanding what they touch. The core workflow, branches and remotes cover almost everything day to day — the undo toolkit and a protected main branch are what keep the rare mistake from ever becoming a real problem.",
    ]}
    points={[
      "Commit small and often — it makes history easy to read and easy to safely undo",
      "Branches are cheap: create one for anything, even a five-minute experiment, and just delete it if it doesn't work out",
      "git fetch before git pull when you want to see what changed before it merges into your work",
      "Prefer git stash and git revert over git reset on anything already pushed — reset rewrites history, and history other people rely on should never move",
      "git reflog is the real safety net — almost nothing is unrecoverable as long as it was committed or stashed at some point",
      "A protected main branch — no direct pushes, required review, required CI — turns 'don't break main' from a promise into something the platform enforces",
    ]}
  />
)
