import { CodeBlock, SectionShell } from '../Shared'

const GlobbingSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Globbing — Wildcard Filename Matching</span>
    <p className="text-white leading-relaxed text-sm">
      Before Bash runs a command, it expands any unquoted <code>*</code>, <code>?</code> or <code>[...]</code>{' '}
      into matching filenames. This is a different (simpler) thing than regex, even though it looks similar.
    </p>
    <CodeBlock label="terminal">{`ls *.txt          # every file ending in .txt
ls report?.csv    # report1.csv, reportA.csv... ? matches exactly one character
ls file[1-3].log  # file1.log, file2.log, file3.log (a character from the set/range)
ls .*             # hidden (dotfile) matches — normal * skips dotfiles on purpose

shopt -s globstar
ls **/*.js        # ** recurses into subdirectories too (needs globstar enabled)`}</CodeBlock>
  </div>
)

const BraceExpansionSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Brace Expansion — Generating Lists Without Globs</span>
    <p className="text-white leading-relaxed text-sm">
      Unlike globbing, brace expansion doesn't look at the filesystem at all — it just generates strings, which
      makes it useful even for things that don't exist yet.
    </p>
    <CodeBlock label="terminal">{`echo file{1,2,3}.txt     # file1.txt file2.txt file3.txt
echo {a,b,c}.log         # a.log b.log c.log
mkdir -p project/{src,tests,docs}   # creates all three directories in one call
echo {1..5}              # 1 2 3 4 5
echo {01..05}             # 01 02 03 04 05 (zero-padded)
echo {5..1}               # 5 4 3 2 1 (counts down too)`}</CodeBlock>
  </div>
)

const TildeAndArithmeticSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Tilde & Arithmetic Expansion</span>
    <CodeBlock label="terminal">{`cd ~          # your home directory
cd ~sarah     # sarah's home directory (if she has one)
cd -          # the PREVIOUS directory you were in

echo $((5 + 3))      # 8 — arithmetic expansion
echo $((10 / 3))     # 3 — integer division, no decimals
echo $((10 % 3))     # 1 — remainder
let count++           # another way to do arithmetic, modifies a variable in place
((count++))            # same thing, more common in modern scripts`}</CodeBlock>
  </div>
)

export const BashExpansionsGlobbingSection = () => (
  <SectionShell
    title="Globbing & Brace Expansion"
    paragraphs={[
      "Bash expands several kinds of shorthand before it ever runs a command — wildcards that match real files (globbing), patterns that generate strings out of thin air (brace expansion), and shortcuts for your home directory and arithmetic. Recognizing which is which stops a lot of confusing behavior from feeling random.",
    ]}
  >
    <div className="space-y-6">
      <GlobbingSection />
      <BraceExpansionSection />
      <TildeAndArithmeticSection />
    </div>
  </SectionShell>
)
