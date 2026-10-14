import { CodeBlock, SectionShell } from '../Shared'

const BasicsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Declaring & Using Variables</span>
    <p className="text-white leading-relaxed text-sm">
      No spaces around the <code>=</code> — that's the single most common Bash typo. To read a variable's value
      back, prefix it with <code>$</code> (or wrap it in <code>${'{'}{'}'}</code> when it's next to other text).
    </p>
    <CodeBlock label="terminal">{`name="sarah"
echo $name          # sarah
echo "Hi, ${'$'}{name}!"   # Hi, sarah!  (braces avoid ambiguity next to other characters)

count=5
count=$((count + 1))   # arithmetic needs $(( ))
echo $count             # 6`}</CodeBlock>
  </div>
)

const QuotingSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Quoting — The Thing That Trips Everyone Up</span>
    <p className="text-white leading-relaxed text-sm">
      Double quotes let variables expand inside them; single quotes treat everything literally, variables
      included. Unquoted variables get word-split and glob-expanded, which is almost never what you want —
      especially once a value might contain a space.
    </p>
    <CodeBlock label="terminal">{`file="my report.txt"

echo $file     # prints: my report.txt  (looks fine here, but...)
rm $file       # tries to delete TWO files: "my" and "report.txt" — breaks!
rm "$file"     # correctly deletes the one file named "my report.txt"

echo 'Value is $file'    # prints literally: Value is $file (single quotes = no expansion)
echo "Value is $file"    # prints: Value is my report.txt`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      Rule of thumb: always double-quote a variable unless you specifically want word-splitting.
    </p>
  </div>
)

const CommandSubstitutionSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Command Substitution — Capturing Output</span>
    <CodeBlock label="terminal">{`today=$(date +%Y-%m-%d)
echo "Today is $today"

files=$(ls *.txt | wc -l)
echo "There are $files text files here"

# Nesting works too
echo "Backup: backup-$(date +%s).tar.gz"`}</CodeBlock>
  </div>
)

const EnvVarsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Environment Variables</span>
    <p className="text-white leading-relaxed text-sm">
      A plain variable only exists in the current shell. <code>export</code> promotes it to an environment
      variable, which gets copied into every program that shell launches — how config like{' '}
      <code>DATABASE_URL</code> reaches an app without being hardcoded.
    </p>
    <CodeBlock label="terminal">{`export API_KEY="abc123"
python my_script.py     # my_script.py can read API_KEY from its environment

echo $PATH               # a built-in env var: where Bash looks for programs
echo $HOME                # your home directory
env | grep API            # list all env vars matching "API"`}</CodeBlock>
  </div>
)

const DefaultsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Parameter Expansion Defaults</span>
    <p className="text-white leading-relaxed text-sm">
      A handful of <code>${'{'}var...{'}'}</code> forms handle "what if this variable is empty or unset" without
      an <code>if</code> statement — they come up constantly in scripts that take optional arguments or config.
    </p>
    <CodeBlock label="terminal">{`echo "${'$'}{name:-"anonymous"}"   # use "anonymous" if $name is unset or empty, but don't change $name
echo "${'$'}{name:="anonymous"}"   # same, but ALSO sets $name to "anonymous" if it was empty
echo "${'$'}{name:?"name is required"}"  # print an error and exit the script if $name is unset or empty
echo "${'$'}{name:+"set"}"         # print "set" if $name IS set, otherwise print nothing`}</CodeBlock>
  </div>
)

export const BashVariablesSection = () => (
  <SectionShell
    title="Variables & Quoting"
    paragraphs={[
      "Variables are how Bash scripts hold onto data — a filename, a count, the output of another command. Quoting is how you control whether Bash looks inside a string for variables and splits it on spaces, or leaves it completely alone. Get comfortable with both before touching loops or functions — nearly every real-world Bash bug traces back to one of these two things.",
    ]}
  >
    <div className="space-y-6">
      <BasicsSection />
      <QuotingSection />
      <CommandSubstitutionSection />
      <EnvVarsSection />
      <DefaultsSection />
    </div>
  </SectionShell>
)
