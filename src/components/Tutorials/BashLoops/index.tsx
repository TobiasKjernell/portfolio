import { CodeBlock, SectionShell } from '../Shared'

const ForSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">for — Looping Over A List</span>
    <CodeBlock label="terminal">{`for name in sarah tom alex; do
    echo "Hello, $name"
done

# looping over files — ALWAYS prefer this glob form over parsing \`ls\`
for file in *.log; do
    echo "Found: $file"
done

# C-style, for counting
for ((i = 1; i <= 5; i++)); do
    echo "Attempt $i"
done`}</CodeBlock>
  </div>
)

const WhileSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">while & until</span>
    <CodeBlock label="terminal">{`count=0
while [[ $count -lt 5 ]]; do
    echo "Count is $count"
    count=$((count + 1))
done

# until is the inverse — loops WHILE the condition is false
until ping -c1 example.com &>/dev/null; do
    echo "Waiting for network..."
    sleep 2
done

# reading a file line by line
while read -r line; do
    echo "Line: $line"
done < input.txt`}</CodeBlock>
  </div>
)

const ControlFlowSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">break & continue</span>
    <CodeBlock label="terminal">{`for n in 1 2 3 4 5; do
    if [[ $n -eq 3 ]]; then
        continue   # skip just this iteration
    fi
    if [[ $n -eq 5 ]]; then
        break      # stop the loop entirely
    fi
    echo $n
done
# prints: 1 2 4`}</CodeBlock>
  </div>
)

const SelectSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">select — A Quick Interactive Menu</span>
    <CodeBlock label="terminal">{`select env in "staging" "production" "cancel"; do
    case $env in
        staging)    echo "Deploying to staging"; break ;;
        production) echo "Deploying to production"; break ;;
        cancel)     echo "Cancelled"; break ;;
    esac
done
# prints a numbered menu and loops until a valid choice is picked`}</CodeBlock>
  </div>
)

export const BashLoopsSection = () => (
  <SectionShell
    title="Loops"
    paragraphs={[
      "Loops are what turn \"do this once\" into \"do this for every file,\" \"retry until it works,\" or \"process every line of this log.\" for and while cover almost every case you'll ever need.",
    ]}
  >
    <div className="space-y-6">
      <ForSection />
      <WhileSection />
      <ControlFlowSection />
      <SelectSection />
    </div>
  </SectionShell>
)
