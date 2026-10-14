import { CodeBlock, SectionShell } from '../Shared'

const IfSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">if / elif / else</span>
    <p className="text-white leading-relaxed text-sm">
      <code>[[ ... ]]</code> is a test — it evaluates to true or false (really: exit code 0 or nonzero) and{' '}
      <code>if</code> branches on that. Spaces around the brackets and inside them are required.
    </p>
    <CodeBlock label="terminal">{`age=20

if [[ $age -ge 18 ]]; then
    echo "Adult"
elif [[ $age -ge 13 ]]; then
    echo "Teenager"
else
    echo "Child"
fi`}</CodeBlock>
  </div>
)

const TestOperatorsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Test Operators Worth Memorizing</span>
    <ul className="space-y-2">
      {[
        ['-eq / -ne / -gt / -ge / -lt / -le', 'numeric: equal, not equal, greater, greater-or-equal, less, less-or-equal'],
        ['== / !=', 'string: equal / not equal — use these, not -eq, for comparing text'],
        ['-z "$var" / -n "$var"', 'string is empty / string is non-empty'],
        ['-f path / -d path', 'path is a regular file / path is a directory'],
        ['-e path', 'path exists at all (file, directory, symlink...)'],
        ['-x path', 'path exists and is executable'],
        ['&& / ||', 'logical AND / OR — combine multiple tests inside [[ ]]'],
      ].map(([op, desc]) => (
        <li
          key={op}
          className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20"
        >
          <code className="gold-text shrink-0 sm:w-56">{op}</code>
          <span className="text-gray-300">{desc}</span>
        </li>
      ))}
    </ul>
    <CodeBlock label="terminal">{`if [[ -f "config.yml" && -n "$API_KEY" ]]; then
    echo "Ready to start"
fi

if [[ "$1" == "deploy" ]]; then
    echo "Deploying..."
fi`}</CodeBlock>
  </div>
)

const CaseSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">case — Cleaner Than A Chain Of elif</span>
    <CodeBlock label="terminal">{`read -p "Deploy to which env? " env

case $env in
    prod|production)
        echo "Deploying to production"
        ;;
    staging)
        echo "Deploying to staging"
        ;;
    *)
        echo "Unknown environment: $env"
        exit 1
        ;;
esac`}</CodeBlock>
  </div>
)

export const BashConditionalsSection = () => (
  <SectionShell
    title="Conditionals & Tests"
    paragraphs={[
      "Conditionals are where Bash scripts stop being a fixed list of commands and start making decisions — check a file exists, compare a value, branch on a command's exit code.",
    ]}
  >
    <div className="space-y-6">
      <IfSection />
      <TestOperatorsSection />
      <CaseSection />
    </div>
  </SectionShell>
)
