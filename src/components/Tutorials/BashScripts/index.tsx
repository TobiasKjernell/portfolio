import { CodeBlock, SectionShell, StepList } from '../Shared'

const ArgsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Reading Arguments Passed To A Script</span>
    <CodeBlock label="deploy.sh">{`#!/usr/bin/env bash
echo "Script name: $0"
echo "First arg:   $1"
echo "Second arg:  $2"
echo "All args:    $@"
echo "Arg count:   $#"`}</CodeBlock>
    <CodeBlock label="terminal">{`./deploy.sh staging --force
# Script name: ./deploy.sh
# First arg:   staging
# Second arg:  --force
# All args:    staging --force
# Arg count:   2`}</CodeBlock>
  </div>
)

const ShiftSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">shift — Consuming Arguments One At A Time</span>
    <p className="text-white leading-relaxed text-sm">
      <code>shift</code> drops <code>$1</code> and moves every other argument down by one, which is what lets a
      script loop through an unknown number of arguments using only <code>$1</code>.
    </p>
    <CodeBlock label="terminal">{`while [[ $# -gt 0 ]]; do
    echo "Processing: $1"
    shift
done`}</CodeBlock>
  </div>
)

const GetoptsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">getopts — Parsing Real -flag Options</span>
    <p className="text-white leading-relaxed text-sm">
      Once a script accepts more than one or two positional arguments, flags like <code>-e staging</code> or{' '}
      <code>-f</code> get unreadable to parse by hand — <code>getopts</code> is the built-in way to do it
      properly.
    </p>
    <CodeBlock label="terminal">{`#!/usr/bin/env bash
force=false
env="staging"

while getopts "e:f" opt; do
    case $opt in
        e) env="$OPTARG" ;;   # the : after e means it takes a value
        f) force=true ;;       # no : means it's a boolean flag
        *) echo "Usage: $0 [-e environment] [-f]"; exit 1 ;;
    esac
done

echo "Deploying to $env (force=$force)"
# ./deploy.sh -e production -f`}</CodeBlock>
  </div>
)

const SafetyFlagsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">set -euo pipefail — Almost Every Real Script Needs This</span>
    <p className="text-white leading-relaxed text-sm">
      By default, Bash shrugs off a failed command and keeps going to the next line — exactly backwards from
      what a script usually wants. These three options turn that off.
    </p>
    <CodeBlock label="terminal">{`set -e           # exit immediately if any command fails (nonzero exit code)
set -u           # treat using an undefined variable as an error, instead of silently using ""
set -o pipefail  # a pipeline fails if ANY command in it fails, not just the last one

# in practice, put this one line at the top of almost every script:
set -euo pipefail`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      Without <code>pipefail</code>, <code>grep "x" missing_file | sort</code> would exit 0 (success) because{' '}
      <code>sort</code> succeeded, even though <code>grep</code> failed trying to read a file that doesn't exist.
    </p>
  </div>
)

const FullScriptExample = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Putting It All Together</span>
    <p className="text-white leading-relaxed text-sm">
      A small but realistic script — backs up a directory, using everything covered so far: a shebang, safety
      flags, an argument, a function, a conditional and a loop.
    </p>
    <CodeBlock label="backup.sh">{`#!/usr/bin/env bash
set -euo pipefail

backup_dir() {
    local src=$1
    local dest="backup-$(date +%Y%m%d-%H%M%S).tar.gz"

    if [[ ! -d "$src" ]]; then
        echo "Error: $src is not a directory" >&2
        exit 1
    fi

    tar -czf "$dest" "$src"
    echo "Backed up $src to $dest"
}

if [[ $# -eq 0 ]]; then
    echo "Usage: $0 <directory>" >&2
    exit 1
fi

for dir in "$@"; do
    backup_dir "$dir"
done`}</CodeBlock>
  </div>
)

export const BashScriptsSection = () => (
  <SectionShell
    title="Writing Real Scripts"
    paragraphs={[
      "Everything so far works the same inside a saved, reusable script — the remaining pieces are: how a script reads what was passed to it, and the handful of safety options that keep a real script from silently doing the wrong thing when something goes wrong.",
    ]}
  >
    <div className="space-y-6">
      <ArgsSection />
      <ShiftSection />
      <GetoptsSection />
      <SafetyFlagsSection />
      <FullScriptExample />
      <StepList
        steps={[
          'Always start a real script with #!/usr/bin/env bash and set -euo pipefail',
          'chmod +x script.sh once, then run it directly as ./script.sh',
          'Quote every variable expansion ("$var", "$@") unless you deliberately want word-splitting',
        ]}
      />
    </div>
  </SectionShell>
)
