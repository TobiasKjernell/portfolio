import { SectionShell } from '../Shared'

export const BashKeyTakeawaysSection = () => (
  <SectionShell
    title="Key Takeaways"
    paragraphs={[
      "Bash rewards the same small set of habits applied consistently far more than it rewards memorizing every feature — quote your variables, check your exit codes, and start every real script the same safe way.",
    ]}
    points={[
      'Everything is built on exit codes (0 = success) — if, while, && and || are all just different ways of reacting to one',
      'Quote your variables: "$var" not $var, "$@" not $@ — almost every real Bash bug is a missing quote',
      'Start every script with #!/usr/bin/env bash and set -euo pipefail',
      'Prefer [[ ]] over [ ] for tests — it\'s safer with unquoted and empty variables',
      'local inside a function keeps its variables from leaking into the rest of the script',
      'getopts and shift are how real scripts parse -flags and arguments instead of hand-rolling it',
      'wait plus $! is what lets a script run things in parallel and still know when they\'re all done',
      'Aliases and functions only persist across terminals once they live in ~/.bashrc',
      'shellcheck catches the quoting and logic mistakes this tutorial warns about, automatically, before you find them the hard way',
    ]}
  />
)
