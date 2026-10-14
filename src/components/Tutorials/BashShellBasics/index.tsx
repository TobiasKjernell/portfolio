import { CodeBlock, SectionShell } from '../Shared'

const ArgumentsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Commands, Arguments & Flags</span>
    <p className="text-white leading-relaxed text-sm">
      Every line you type is a command followed by any number of arguments, separated by spaces. An argument
      starting with <code>-</code> or <code>--</code> is usually called a flag or option — it changes how the
      command behaves rather than being data for it to act on.
    </p>
    <CodeBlock label="terminal">{`ls -la /home/sarah
# ls   = command
# -la  = flags (combines -l and -a)
# /home/sarah = argument

cp -r src/ dest/     # -r is a flag, src/ and dest/ are arguments
grep -i "error" log  # -i (case-insensitive) is a flag`}</CodeBlock>
  </div>
)

const ExitCodesSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Exit Codes — How A Command Reports Success</span>
    <p className="text-white leading-relaxed text-sm">
      Every command, when it finishes, returns a number called an exit code. <code>0</code> means success,
      anything else (1–255) means some kind of failure. This is the single most important concept for everything
      that comes later — every conditional and loop in this tutorial is secretly just checking exit codes.
    </p>
    <CodeBlock label="terminal">{`ls /tmp
echo $?        # prints 0 — the last command succeeded

ls /not/a/real/path
echo $?        # prints 2 (or similar nonzero) — it failed

grep "x" myfile.txt
echo $?        # 0 if found, 1 if not found, 2 if myfile.txt doesn't exist`}</CodeBlock>
  </div>
)

const ChainingSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Chaining Commands — &&, || and ;</span>
    <CodeBlock label="terminal">{`mkdir build && cd build        # run cd ONLY if mkdir succeeded
cd build || echo "no such dir"  # run echo ONLY if cd failed
make clean; make build          # run both regardless of what the first one did

# Real example: only deploy if the tests passed
npm test && npm run deploy`}</CodeBlock>
  </div>
)

export const BashShellBasicsSection = () => (
  <SectionShell
    title="Commands, Exit Codes & Chaining"
    paragraphs={[
      "Before variables or loops, it's worth being precise about how Bash actually reads a line, and how one command communicates success or failure to the next — that single idea (the exit code) is the backbone of every conditional and loop you'll write.",
    ]}
  >
    <div className="space-y-6">
      <ArgumentsSection />
      <ExitCodesSection />
      <ChainingSection />
    </div>
  </SectionShell>
)
