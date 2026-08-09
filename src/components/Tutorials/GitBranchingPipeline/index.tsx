import { CodeBlock, SectionShell, StepList } from '../Shared'

const TwoTierDiagramSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Two Branches, Two Jobs — And One Firm Rule</span>
    <p className="text-white leading-relaxed text-sm">
      <code className="text-[#cea86f]">main</code> is what's actually in production.{' '}
      <code className="text-[#cea86f]">develop</code> is the shared testing ground: every feature branch merges
      there first, so the team can try it out together. The rule that keeps this safe is that{' '}
      <span className="text-[#cea86f]">develop itself is never merged into main</span>. Since several people's
      work can be sitting on develop at once — some accepted, some still being tested — merging the whole branch
      would ship whatever else happens to be there along with it. Instead, only the one feature branch that's
      actually been accepted gets promoted into main, by itself.
    </p>
    <p className="text-white leading-relaxed text-sm">
      The pull request itself opens early — as soon as the branch is pushed, targeting{' '}
      <code className="text-[#cea86f]">main</code> — but it doesn't merge yet. Its job at that point is just to
      show the diff, so anyone can see exactly what changed and know what to go test. The actual testing happens
      by merging the branch straight into <code className="text-[#cea86f]">develop</code>, no PR involved. Only
      once develop confirms the feature is good does the branch get merged into main by hand — the PR was never
      the thing doing the merging, just the diff and discussion sitting next to it the whole time.
    </p>
    <CodeBlock>{`t0   git switch main && git pull, then git switch -c feature/login   (branch from up-to-date main)
t1   push feature/login, open PR → main        (diff visible, nothing merges yet)
t2   git switch develop && git pull            (always get develop's latest first)
t3   git merge feature/login                   (direct merge, no PR — this is the testing step)
t4   team tests on develop, using the PR diff as the checklist
t5   develop confirms it's good
t6   git switch main && git pull, then merge main → feature/login, resolve conflicts, commit
t7   main moved again while you were resolving? merge main → feature/login again, repeat until caught up
t8   branch is conflict-free and up to date — git switch main, git merge feature/login, git push (by hand, not the PR button)`}</CodeBlock>
  </div>
)

const PipelineStepsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">One Feature, Start To Finish</span>
    <StepList
      steps={[
        'Branch off an up-to-date main — git switch main && git pull, then git switch -c feature/short-name',
        'Commit small, focused changes as the work progresses — each one should stand on its own',
        'Push the branch and open a pull request into main right away — not to merge it yet, just so the diff is visible and reviewers know exactly what to test',
        'Always git pull develop first, then merge the same branch straight into it, separately from the PR — no review needed for this step, it just makes the feature available to try out',
        "The team tests on develop, using the open PR's diff as the checklist of what changed",
        "Once it's accepted on develop, that same branch gets merged into main by hand next — the PR stays open for the diff and discussion, but it's not what performs the merge",
      ]}
    />
    <CodeBlock>{`git switch main
git pull
git switch -c feature/login

# ...commit as you go...

git push -u origin feature/login
# open a pull request: feature/login → main (diff visible, not merged yet)

git switch develop
git pull
git merge feature/login   # direct merge into develop, separate from the PR
git push`}</CodeBlock>
  </div>
)

const FailedTestLoopSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">When Testing On Develop Finds A Bug</span>
    <p className="text-white leading-relaxed text-sm">
      This is exactly what <code className="text-[#cea86f]">develop</code> is for — catching a broken merge
      before it ever gets near <code className="text-[#cea86f]">main</code>. The fix goes back onto the same
      branch that's backing the open PR, so pushing it does two things at once: it updates develop once re-merged,
      and it silently refreshes the PR's diff, with no extra step required.
    </p>
    <CodeBlock>{`feature/login:   D1---D2--------D3---D4
                       \\              \\
develop:      A---B-----M1(bug found)--M2(fix merged)---C`}</CodeBlock>
    <StepList
      steps={[
        "Don't fix it directly on develop — go back to git switch feature/login (or, if it was already deleted, branch a fresh fix/login-redirect off an up-to-date main)",
        'Reproduce the problem and commit the fix there, same as any normal change — this also updates the still-open PR automatically',
        'git pull develop first, same as always, then merge the branch into it again the same direct way, so the team can re-test with the fix included',
        "Only merge the branch into main once develop has confirmed the fix actually works — and don't delete the branch before then either",
      ]}
    />
  </div>
)

const PromotingToMainSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Once It's Accepted — Promoting To Main</span>
    <p className="text-white leading-relaxed text-sm">
      This is the other half of the rule: the feature branch, not develop, is what reaches main — and the PR that
      opened at the start of all this is only ever there for visibility, a place to see the diff and follow the
      discussion. The actual merge into main happens the same way every other merge in this pipeline does: by
      hand, with git, not by clicking the merge button on GitHub.
    </p>
    <StepList
      steps={[
        'git switch main && git pull — make sure your local main matches whatever else has shipped since you branched off',
        'git switch feature/login, then git merge main — bring those changes into your branch and resolve any conflicts right here, where a mistake only affects you',
        'Commit the resolved merge and push — this updates the diff on the open PR, it does not open a new one',
        'Check main again — if someone else merged something new into main while you were resolving, repeat the last three steps: pull main, merge it into your branch again, resolve, commit, push',
        'Keep looping until a fresh git pull on main brings back nothing new — that\'s when your branch is finally caught up',
        'CI reruns and a teammate does the final review on the PR — the branch is already conflict-free, so this is about the change itself, not a merge mess',
        'Once approved, merge it yourself: git switch main, git merge feature/login, git push — the PR just gets closed automatically once GitHub notices main now contains the branch',
        'Delete the feature branch — its work is now part of production',
      ]}
    />
    <CodeBlock>{`git switch main
git pull
git switch feature/login
git merge main              # resolve conflicts here, on your own branch
git add .
git commit
git push                    # updates the PR that's already open — no new PR needed

# if main picked up new commits again before you merged, repeat:
git switch main
git pull
git switch feature/login
git merge main
git push

# once approved, merge it yourself — no PR button:
git switch main
git merge feature/login
git push origin main`}</CodeBlock>
  </div>
)

const DeletingMergedBranchesSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Why Delete The Branch Once It's In Main</span>
    <p className="text-white leading-relaxed text-sm">
      Deleting <code className="text-[#cea86f]">feature/login</code> right after it lands in main feels final,
      but nothing is actually lost — every commit on it is already reachable from main's history through the
      merge. Deleting the branch only removes the label pointing at those commits, not the commits themselves.
    </p>
    <ul className="space-y-2 mt-2">
      {[
        "It signals the work is actually done — a branch left sitting around looks like unfinished business to everyone else, even once its content has already shipped",
        "It keeps the branch list a true map of what's in progress — a few dozen stale, already-merged branches bury the two or three that are still active",
        "It prevents someone from accidentally building on top of it later — commit onto an already-merged branch and the next PR against main shows a confusing, mostly-empty diff, since everything in it already exists there",
        "If CI or a hosting platform spins up a preview environment per branch, deleting it tears that down too — an old branch left alive quietly burns build minutes and cloud resources for nothing",
      ].map((point) => (
        <li
          key={point}
          className="flex gap-3 text-gray-300 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20"
        >
          <span className="gold-text">→</span>
          {point}
        </li>
      ))}
    </ul>
    <CodeBlock>{`git branch -d feature/login              # safe delete — refuses if it isn't fully merged yet
git push origin --delete feature/login   # remove it from the remote too

git branch -D feature/login              # force delete — only once you're certain`}</CodeBlock>
    <p className="text-gray-400 text-sm leading-relaxed">
      <code className="text-[#cea86f]">-d</code> (lowercase) is the one to reach for by default — Git checks the
      branch is actually merged first and refuses otherwise, the same safety-first habit as everything in{' '}
      <span className="text-[#cea86f]">The Safe Undo Toolkit</span>. And if a branch does get deleted by mistake,{' '}
      <code className="text-[#cea86f]">git reflog</code> can still point back to its last commit, ready to be
      restored with <code className="text-[#cea86f]">git branch feature/login &lt;sha&gt;</code>.
    </p>
  </div>
)

const ProtectingBranchesSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">What Makes It "Bulletproof"</span>
    <p className="text-white leading-relaxed text-sm">
      None of this works from discipline alone — it works because the hosting platform enforces it, and it only
      enforces the parts that actually protect production. <code className="text-[#cea86f]">develop</code> stays
      deliberately loose so testing never has friction; <code className="text-[#cea86f]">main</code> is where all
      the ceremony lives.
    </p>
    <p className="text-white leading-relaxed text-sm">
      One honest caveat: this deliberately stops short of GitHub's strictest "require a pull request before
      merging" setting, since that rule blocks every push to main that didn't go through GitHub's own merge
      button — including a manual one. What's actually enforced here is required status checks and required
      review on the PR as gates, with push access to main left open for whoever's doing the merge by hand once
      those gates are green. That's a normal setup on a smaller or high-trust team; a larger one might prefer
      the fully locked-down version instead.
    </p>
    <ul className="space-y-2 mt-2">
      {[
        'develop accepts direct merges from any branch — no pull request, no required review, no CI gate — because nothing there is customer-facing yet',
        "A PR can sit open for as long as testing takes — its only job is CI, review and a visible diff, right up until someone actually runs the merge by hand",
        'Required status checks on main\'s PR — you don\'t merge by hand while CI is still red',
        'Required review on main\'s PR — at least one approval before anyone merges',
        "git itself is the last line of defense: a plain git push to main is rejected outright if your local main has fallen behind, so an out-of-date merge can't slip through even by accident",
        'develop is never merged into main as a whole — only an individual, already-accepted feature branch is ever promoted, and only after its own PR is reviewed and green',
        'No force-pushes to main, and no deleting it — history stays append-only',
      ].map((point) => (
        <li
          key={point}
          className="flex gap-3 text-gray-300 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20"
        >
          <span className="gold-text">→</span>
          {point}
        </li>
      ))}
    </ul>
  </div>
)

const NamingSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Naming Conventions</span>
    <p className="text-white leading-relaxed text-sm">
      A predictable branch name says what it is before anyone opens it — and lets tooling (like CI rules) key off
      the prefix automatically.
    </p>
    <CodeBlock>{`main                     # always deployable, protected — what's actually in production
develop                  # shared integration branch — low-ceremony, what the team tests against
feature/user-auth        # new work, branched off an up-to-date main
fix/login-redirect       # a fix for something found on develop, also branched off main
release/1.4.0            # optional — for coordinating several promoted features into one shipped version`}</CodeBlock>
  </div>
)

const CommitConventionSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Commit Message Convention</span>
    <p className="text-white leading-relaxed text-sm">
      A prefix like <code className="text-[#cea86f]">feat</code> or <code className="text-[#cea86f]">fix</code>{' '}
      makes the history skimmable, and lets tools generate changelogs and version bumps automatically —{' '}
      <a
        href="https://www.conventionalcommits.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#cea86f] underline decoration-[#cea86f]/40 hover:decoration-[#cea86f]"
      >
        Conventional Commits
      </a>{' '}
      is the most widely used version of this idea.
    </p>
    <CodeBlock>{`feat: add password reset flow
fix: correct off-by-one in pagination
chore: bump dependency versions
docs: update README with setup steps`}</CodeBlock>
  </div>
)

const TaggingSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Tagging Releases</span>
    <p className="text-white leading-relaxed text-sm">
      Once one or more accepted feature branches have been promoted into main, a tag freezes that exact commit
      under a permanent, human-readable name — useful for deploys, rollbacks, and knowing precisely what shipped
      in "v1.4.0."
    </p>
    <CodeBlock>{`git switch main
git pull
git tag -a v1.4.0 -m "Release 1.4.0"
git push origin v1.4.0`}</CodeBlock>
  </div>
)

export const GitBranchingPipelineSection = () => (
  <SectionShell
    title="A Bulletproof Branching Pipeline"
    paragraphs={[
      "This is the workflow that scales from a solo project to a large team without changing shape: main is always deployable, develop is where everything gets tested together first with minimal friction, all work happens on short-lived branches, and only the step that actually reaches production requires a pull request, review and CI.",
    ]}
  >
    <div className="space-y-6">
      <TwoTierDiagramSection />
      <PipelineStepsSection />
      <FailedTestLoopSection />
      <PromotingToMainSection />
      <DeletingMergedBranchesSection />
      <ProtectingBranchesSection />
      <NamingSection />
      <CommitConventionSection />
      <TaggingSection />
    </div>
  </SectionShell>
)
