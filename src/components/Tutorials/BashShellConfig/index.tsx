import { CodeBlock, SectionShell } from '../Shared'

const StartupFilesSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Startup Files — Where Your Setup Actually Lives</span>
    <p className="text-white leading-relaxed text-sm">
      Everything customized about your shell — aliases, custom functions, <code>PATH</code> changes, prompt
      color — lives in one of a few files that Bash reads automatically, depending on how the shell was started.
    </p>
    <ul className="space-y-2">
      {[
        ['~/.bashrc', 'read by every new interactive, non-login shell — a new terminal tab/window. This is where almost everything belongs.'],
        ['~/.bash_profile / ~/.profile', 'read once, at login (e.g. a fresh SSH session). Many setups just source .bashrc from here so both behave the same.'],
        ['/etc/bash.bashrc, /etc/profile', 'system-wide versions of the above, applying to every user on the machine.'],
      ].map(([file, desc]) => (
        <li
          key={file}
          className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20"
        >
          <code className="gold-text shrink-0 sm:w-56">{file}</code>
          <span className="text-gray-300">{desc}</span>
        </li>
      ))}
    </ul>
  </div>
)

const SourceSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">source — Applying Changes Without A New Shell</span>
    <p className="text-white leading-relaxed text-sm">
      Editing <code>~/.bashrc</code> doesn't affect the terminal you're already in — it only gets read when a
      shell starts. <code>source</code> (or its shorthand, a single dot) re-reads a file into the current shell
      immediately.
    </p>
    <CodeBlock label="terminal">{`source ~/.bashrc
. ~/.bashrc       # identical, just shorter`}</CodeBlock>
  </div>
)

const AliasesAndFunctionsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Aliases & Functions — Making Them Permanent</span>
    <p className="text-white leading-relaxed text-sm">
      An alias is a simple text substitution for a command you type often. For anything that needs arguments or
      logic, a function (defined the same way covered earlier) does the job instead — both go in{' '}
      <code>~/.bashrc</code> so they're available in every new terminal.
    </p>
    <CodeBlock label="~/.bashrc">{`alias ll="ls -la"
alias gs="git status"
alias ..="cd .."

# a function works here too, and can take arguments (aliases can't)
mkcd() {
    mkdir -p "$1" && cd "$1"
}`}</CodeBlock>
    <CodeBlock label="terminal — after source ~/.bashrc">{`ll
gs
mkcd new-project   # creates new-project/ AND cd's into it, in one command`}</CodeBlock>
  </div>
)

const PathSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">PATH — How Bash Finds A Command</span>
    <p className="text-white leading-relaxed text-sm">
      <code>PATH</code> is a colon-separated list of directories Bash searches, in order, whenever you type a
      command name. "command not found" almost always means the program either isn't installed, or lives
      somewhere not in this list.
    </p>
    <CodeBlock label="terminal">{`echo $PATH
# /usr/local/bin:/usr/bin:/bin:/usr/local/games

which node        # shows the exact file that would run for "node"
type ll            # shows whether something is a file, alias, or function

export PATH="$HOME/scripts:$PATH"   # add your own scripts folder, checked FIRST
# put this line in ~/.bashrc to make it permanent`}</CodeBlock>
  </div>
)

export const BashShellConfigSection = () => (
  <SectionShell
    title="Shell Configuration"
    paragraphs={[
      "Everything covered so far works the moment you type it — this section is about making your favorite shortcuts, functions and settings available automatically, every time you open a new terminal.",
    ]}
  >
    <div className="space-y-6">
      <StartupFilesSection />
      <SourceSection />
      <AliasesAndFunctionsSection />
      <PathSection />
    </div>
  </SectionShell>
)
