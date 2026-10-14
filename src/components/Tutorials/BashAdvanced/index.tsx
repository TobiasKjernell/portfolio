import { CodeBlock, SectionShell } from '../Shared'

const ArraysSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Arrays</span>
    <CodeBlock label="terminal">{`fruits=("apple" "banana" "cherry")

echo "${'$'}{fruits[0]}"       # apple
echo "${'$'}{fruits[@]}"       # apple banana cherry  (all elements)
echo "${'$'}{#fruits[@]}"      # 3  (length)

fruits+=("date")          # append an element

for fruit in "${'$'}{fruits[@]}"; do
    echo "- $fruit"
done

# Associative arrays (bash 4+) — like a dictionary/map
declare -A colors
colors[sky]="blue"
colors[grass]="green"
echo "${'$'}{colors[sky]}"     # blue`}</CodeBlock>
  </div>
)

const StringOpsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">String Manipulation — No External Tools Needed</span>
    <CodeBlock label="terminal">{`path="/home/sarah/report.final.txt"

echo "${'$'}{#path}"              # length of the string
echo "${'$'}{path##*/}"           # report.final.txt   (strip longest match from the front — basename)
echo "${'$'}{path%/*}"            # /home/sarah        (strip shortest match from the back — dirname)
echo "${'$'}{path%.*}"            # /home/sarah/report.final  (strip extension)
echo "${'$'}{path/sarah/tom}"     # replace first match: /home/tom/report.final.txt

name="sarah"
echo "${'$'}{name^^}"             # SARAH  (uppercase)
echo "${'$'}{name:0:3}"           # sar    (substring: start at 0, length 3)

greeting="Hello, World"
echo "${'$'}{greeting:-"default"}" # use value if set, otherwise "default"`}</CodeBlock>
  </div>
)

const RegexSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Pattern Matching & Regex</span>
    <CodeBlock label="terminal">{`filename="photo_2024.jpg"

if [[ $filename == *.jpg ]]; then
    echo "It's a jpg"          # glob-style match, simple wildcards
fi

if [[ $filename =~ ^photo_([0-9]{4})\\.jpg$ ]]; then
    echo "Year is: ${'$'}{BASH_REMATCH[1]}"   # extended regex, captured group
fi`}</CodeBlock>
  </div>
)

const PrintfAndReadSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">printf vs echo, & Reading Input Properly</span>
    <p className="text-white leading-relaxed text-sm">
      <code>echo</code> is fine for simple output, but its behavior with flags and escape sequences varies
      between shells. <code>printf</code> behaves identically everywhere and gives real control over formatting.
    </p>
    <CodeBlock label="terminal">{`printf "Name: %s, Age: %d\\n" "Sarah" 30
printf "%-10s %5d\\n" "item" 42      # left-pad a string, right-pad a number — aligned columns

read -p "Enter your name: " name     # -p shows a prompt
read -sp "Enter password: " pass     # -s hides what's typed (for passwords)
echo
read -r line                          # -r = don't let backslashes escape characters (almost always want this)
read -a parts <<< "one two three"     # -a splits input into an array`}</CodeBlock>
  </div>
)

const HistorySection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">History Expansion — Reusing Previous Commands</span>
    <CodeBlock label="terminal">{`!!            # re-run the last command exactly
sudo !!       # very common: forgot sudo, re-run the last command WITH it

!$            # the last argument of the previous command
cp report.txt /backup/
cd !$          # cd into /backup/ — reuses "/backup/" from the line above

!ls           # re-run the most recent command that started with "ls"
history       # list recent command history, numbered
!42           # re-run history entry number 42`}</CodeBlock>
  </div>
)

const TrapSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">trap — Cleaning Up On Exit Or Ctrl+C</span>
    <p className="text-white leading-relaxed text-sm">
      <code>trap</code> runs a command when a script receives a signal — most commonly, making sure temp files
      get deleted whether the script finishes normally, errors out, or is interrupted with Ctrl+C.
    </p>
    <CodeBlock label="terminal">{`tmpfile=$(mktemp)
cleanup() {
    echo "Cleaning up..."
    rm -f "$tmpfile"
}
trap cleanup EXIT      # runs on ANY exit — success, error, or Ctrl+C (SIGINT)

echo "Working with $tmpfile"
# ... script continues, cleanup() always runs before the process actually exits`}</CodeBlock>
  </div>
)

const DebuggingSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Debugging A Script</span>
    <CodeBlock label="terminal">{`bash -x script.sh       # print every command as it's run, with expanded variables
set -x                   # turn the same tracing on partway through a script
set +x                   # turn it back off

shellcheck script.sh     # static analysis — catches quoting bugs, typos, unsafe patterns (install separately)`}</CodeBlock>
  </div>
)

export const BashAdvancedSection = () => (
  <SectionShell
    title="Advanced Bash"
    paragraphs={[
      "The last stretch — arrays, built-in string manipulation, basic regex, and the tools for cleaning up after a script and for working out why one is misbehaving. None of this is needed for a simple script, but all of it shows up constantly in real-world ones.",
    ]}
  >
    <div className="space-y-6">
      <ArraysSection />
      <StringOpsSection />
      <RegexSection />
      <PrintfAndReadSection />
      <HistorySection />
      <TrapSection />
      <DebuggingSection />
    </div>
  </SectionShell>
)
