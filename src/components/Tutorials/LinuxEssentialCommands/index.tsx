import { CodeBlock, SectionShell, StepList } from '../Shared'

const COMMAND_GROUPS: { title: string; rows: { cmd: string; desc: string }[] }[] = [
  {
    title: 'Finding Your Way Around',
    rows: [
      { cmd: 'pwd', desc: 'Print working directory — shows the full path of where you currently are' },
      { cmd: 'ls', desc: 'List files in the current directory' },
      { cmd: 'ls -la', desc: 'List everything, including hidden files (dotfiles), with details (owner, size, permissions)' },
      { cmd: 'cd path/', desc: 'Change directory — cd .. goes up one level, cd ~ or cd goes home' },
      { cmd: 'tree', desc: 'Show a directory as a visual tree (may need installing: sudo apt install tree)' },
    ],
  },
  {
    title: 'Working With Files & Directories',
    rows: [
      { cmd: 'mkdir name', desc: 'Create a new directory — add -p to create nested folders in one go' },
      { cmd: 'touch file.txt', desc: 'Create an empty file, or update its "last modified" time if it exists' },
      { cmd: 'cp src dest', desc: 'Copy a file — add -r to copy a whole directory recursively' },
      { cmd: 'mv src dest', desc: 'Move or rename a file/directory — Linux has no separate "rename" command' },
      { cmd: 'rm file', desc: 'Delete a file — add -r for directories, -f to skip confirmation (no trash bin, be careful)' },
    ],
  },
  {
    title: 'Looking Inside Files',
    rows: [
      { cmd: 'cat file', desc: 'Print an entire file to the terminal' },
      { cmd: 'less file', desc: 'View a file one page at a time — q to quit, / to search' },
      { cmd: 'head -n 20 file', desc: 'Show the first 20 lines of a file' },
      { cmd: 'tail -f file.log', desc: 'Show the last lines and keep following new lines as they\'re written — great for logs' },
      { cmd: 'grep "text" file', desc: 'Search for a pattern inside a file — add -r to search a whole directory recursively' },
    ],
  },
  {
    title: 'Seeing What The System Is Doing',
    rows: [
      { cmd: 'ps aux', desc: 'List every running process on the system, with its owner, CPU and memory usage' },
      { cmd: 'top / htop', desc: 'A live, updating view of running processes — htop is the friendlier, colorized version' },
      { cmd: 'df -h', desc: 'Show disk space usage per mounted drive, in human-readable units' },
      { cmd: 'du -sh dir/', desc: 'Show the total size of a directory' },
      { cmd: 'kill PID', desc: 'Ask a process to stop — kill -9 PID forces it if it won\'t respond' },
    ],
  },
]

const CommandTable = () => (
  <div className="space-y-6">
    {COMMAND_GROUPS.map(({ title, rows }) => (
      <div key={title} className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
        <span className="text-sm font-semibold gold-text">{title}</span>
        <ul className="space-y-2">
          {rows.map(({ cmd, desc }) => (
            <li
              key={cmd}
              className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20"
            >
              <code className="gold-text shrink-0 sm:w-44">{cmd}</code>
              <span className="text-gray-300">{desc}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)

const PipesAndRedirectSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Chaining Commands Together</span>
    <p className="text-white leading-relaxed text-sm">
      The real power of a shell shows up once you connect small commands together instead of using each one in
      isolation. A pipe (<code>|</code>) feeds the output of one command into the next as input, and redirection
      (<code>&gt;</code> / <code>&gt;&gt;</code>) sends output into a file instead of the screen.
    </p>
    <CodeBlock label="terminal">{`# Find every process with "node" in its name
ps aux | grep node

# Count how many lines are in a file
cat access.log | wc -l

# Save command output to a file (overwrite), or append to it
ls -la > filelist.txt
echo "new line" >> notes.txt`}</CodeBlock>
  </div>
)

export const LinuxEssentialCommandsSection = () => (
  <SectionShell
    title="Essential Commands"
    paragraphs={[
      "Almost everything you'll do in a terminal boils down to a small set of commands used over and over: move around the filesystem, look at files, and check what the system is doing. Learn these first — everything else is built on top of them.",
      'Every command below can take a --help flag, or you can run man <command> for its full manual page (press q to exit).',
    ]}
  >
    <div className="space-y-6">
      <CommandTable />
      <PipesAndRedirectSection />
      <StepList
        steps={[
          "Stuck on what a command does? Run it with --help, or man <command> for the full manual",
          'Tab is your best friend — press it mid-word to auto-complete file and folder names',
          'The up arrow cycles through your command history — Ctrl+R searches it by typing part of a past command',
        ]}
      />
    </div>
  </SectionShell>
)
