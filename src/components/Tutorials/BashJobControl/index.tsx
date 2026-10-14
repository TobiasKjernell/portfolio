import { CodeBlock, SectionShell } from '../Shared'

const BackgroundJobsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Background & Foreground Jobs</span>
    <p className="text-white leading-relaxed text-sm">
      Appending <code>&</code> runs a command in the background, handing the prompt straight back to you. Ctrl+Z
      pauses whatever's currently in the foreground without killing it, which you can then resume in the
      background or foreground.
    </p>
    <CodeBlock label="terminal">{`sleep 100 &        # runs in the background, prompt returns immediately
jobs                # list background/suspended jobs in this shell session
fg %1               # bring job 1 back to the foreground
bg %1               # resume a suspended (Ctrl+Z'd) job IN the background

# Ctrl+Z while something is running: suspends it
# then:
bg                  # continue it in the background
disown %1            # detach it from this shell so it survives you closing the terminal`}</CodeBlock>
  </div>
)

const PidsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">$!, wait & Killing Processes</span>
    <CodeBlock label="terminal">{`long_task &
pid=$!              # $! = the PID of the last backgrounded command
echo "Started as PID $pid"

kill $pid            # ask it to stop (sends SIGTERM)
kill -9 $pid          # force-kill it (sends SIGKILL) — last resort, it can't clean up

wait $pid             # block the script here until that PID finishes
echo "Done waiting"`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      <code>wait</code> is what lets a script fire off several background jobs in parallel, then pause until
      they've all finished before moving on.
    </p>
    <CodeBlock label="terminal">{`for url in "${'$'}{urls[@]}"; do
    curl -O "$url" &    # kick off all downloads in parallel
done
wait                     # wait for every backgrounded job to finish before continuing`}</CodeBlock>
  </div>
)

const SubshellsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Subshells — ( ) vs { }</span>
    <p className="text-white leading-relaxed text-sm">
      Parentheses run a block in a brand new subshell — a separate child process with its own copy of variables
      and its own current directory, which disappears when the block ends. Curly braces just group commands in
      the current shell, so any <code>cd</code> or variable change inside them sticks around afterward.
    </p>
    <CodeBlock label="terminal">{`(cd /tmp && rm -f *.tmp)
pwd   # still your original directory — the cd only happened inside the subshell

{ cd /tmp; rm -f *.tmp; }
pwd   # you're now actually in /tmp — this ran in the current shell`}</CodeBlock>
  </div>
)

export const BashJobControlSection = () => (
  <SectionShell
    title="Job Control & Processes"
    paragraphs={[
      "Everything so far has run one command at a time, waited for, in order. Real scripts and real terminal sessions often need several things running at once — a background job, a long process you want to check back on, or several downloads happening in parallel.",
    ]}
  >
    <div className="space-y-6">
      <BackgroundJobsSection />
      <PidsSection />
      <SubshellsSection />
    </div>
  </SectionShell>
)
