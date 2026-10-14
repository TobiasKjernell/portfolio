import { CodeBlock, SectionShell } from '../Shared'

const StreamsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Three Streams Every Program Has</span>
    <p className="text-white leading-relaxed text-sm">
      Every process starts with three open file streams: standard input (stdin, what it reads), standard output
      (stdout, its normal output) and standard error (stderr, where errors go) — kept separate so you can redirect
      one without the other.
    </p>
    <CodeBlock label="terminal">{`command > out.txt       # redirect stdout to a file (overwrites)
command >> out.txt      # append stdout to a file instead of overwriting
command 2> errors.txt   # redirect stderr only
command > out.txt 2>&1  # redirect BOTH stdout and stderr to the same file
command &> both.txt     # shorthand for the line above
command < input.txt     # feed a file in as stdin instead of typing`}</CodeBlock>
  </div>
)

const PipesSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Pipes — Feeding One Command Into Another</span>
    <p className="text-white leading-relaxed text-sm">
      A pipe (<code>|</code>) connects one command's stdout directly to the next command's stdin, no file in
      between. Chaining several together is how a lot of real Bash one-liners get built, left to right, one
      small transformation at a time.
    </p>
    <CodeBlock label="terminal">{`cat access.log | grep "500" | wc -l
# 1. print the file
# 2. keep only lines containing "500"
# 3. count how many lines survived

ps aux | grep node | awk '{print $2}'
# 1. list processes  2. keep node ones  3. print just the PID column

history | sort | uniq -c | sort -rn | head -10
# your 10 most frequently used commands, ever`}</CodeBlock>
  </div>
)

const HeredocSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Here-Documents — Multi-line Input Inline</span>
    <p className="text-white leading-relaxed text-sm">
      A here-doc (<code>&lt;&lt;</code>) feeds a whole block of text as stdin without needing a separate file —
      handy for generating config files or SQL from inside a script.
    </p>
    <CodeBlock label="terminal">{`cat <<EOF > config.txt
server=localhost
port=8080
EOF

# EOF is just a marker — any word works, as long as start and end match
psql mydb <<SQL
SELECT * FROM users LIMIT 5;
SQL`}</CodeBlock>
  </div>
)

const HerestringSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Here-Strings — One-Line Version Of A Here-Doc</span>
    <CodeBlock label="terminal">{`grep "error" <<< "$log_line"     # feed a single variable in as stdin
wc -w <<< "how many words is this"`}</CodeBlock>
  </div>
)

const ProcessSubstitutionSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Process Substitution — Treating A Command Like A File</span>
    <p className="text-white leading-relaxed text-sm">
      <code>&lt;(command)</code> runs a command and makes its output readable as if it were a file path — handy
      for tools like <code>diff</code> that expect two actual files, when what you really have is two commands.
    </p>
    <CodeBlock label="terminal">{`diff <(ls dir1) <(ls dir2)
# compares the output of the two ls commands directly, no temp files needed`}</CodeBlock>
  </div>
)

const XargsAndTeeSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">xargs & tee</span>
    <p className="text-white leading-relaxed text-sm">
      <code>xargs</code> turns piped-in lines into arguments for another command — needed because most commands
      read arguments, not stdin. <code>tee</code> writes stdin both to a file and back out to stdout, so a
      pipeline can continue while also saving a copy.
    </p>
    <CodeBlock label="terminal">{`find . -name "*.tmp" | xargs rm         # delete every .tmp file found
echo "a b c" | xargs -n1                 # run the next command once per word: a, b, c separately

ls -la | tee filelist.txt | grep ".log"
# saves the full listing to filelist.txt AND still pipes it on to grep`}</CodeBlock>
  </div>
)

export const BashIoRedirectionSection = () => (
  <SectionShell
    title="Input, Output & Pipes"
    paragraphs={[
      "This is the part of Bash that turns small, single-purpose commands into powerful one-liners. Instead of one giant tool that does everything, Unix tools are designed to each do one thing and connect to each other — redirection and pipes are the glue.",
    ]}
  >
    <div className="space-y-6">
      <StreamsSection />
      <PipesSection />
      <HeredocSection />
      <HerestringSection />
      <ProcessSubstitutionSection />
      <XargsAndTeeSection />
    </div>
  </SectionShell>
)
