import { CodeBlock, Panel, SectionShell } from '../Shared'

const PermissionsAnatomy = () => (
  <Panel
    label="Reading ls -la Output"
    caption="-rwxr-xr-- — file type, then owner / group / others permissions, three at a time"
  >
    <div className="w-full font-mono text-xs text-gray-300 bg-[#1a1a1a] rounded-lg p-4 space-y-2">
      <div>
        <span className="text-teal-300">-</span>
        <span className="text-emerald-400">rwx</span>
        <span className="text-orange-300">r-x</span>
        <span className="text-pink-300">r--</span>
        <span className="ml-4 text-gray-500">1 tobias tobias 220 Sep 12 10:03 deploy.sh</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 text-[11px]">
        <div><span className="text-teal-300">type</span> — d = directory, - = file, l = symlink</div>
        <div><span className="text-emerald-400">owner (rwx)</span> — full control</div>
        <div><span className="text-orange-300">group (r-x)</span> — read + execute only</div>
        <div><span className="text-pink-300">others (r--)</span> — read only</div>
      </div>
    </div>
  </Panel>
)

const ChmodSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Changing Permissions — chmod</span>
    <p className="text-white leading-relaxed text-sm">
      Each of read (r), write (w) and execute (x) is a bit, so they add up to a single digit per group: r=4, w=2,
      x=1. <code>chmod 755 file</code> means owner=7 (4+2+1, full), group=5 (4+1, read+execute), others=5
      (read+execute) — the classic permission set for a script others can run but not edit.
    </p>
    <CodeBlock label="terminal">{`chmod 755 deploy.sh     # owner: rwx, group: r-x, others: r-x
chmod +x deploy.sh      # just add execute permission for everyone
chmod 644 notes.txt     # owner: rw-, group: r--, others: r-- (typical for a plain file)
chmod -R 755 my-folder/ # apply recursively to everything inside a directory`}</CodeBlock>
  </div>
)

const OwnershipSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Changing Ownership — chown</span>
    <p className="text-white leading-relaxed text-sm">
      Every file has an owning user and an owning group. This matters constantly with servers — a web server
      process running as user <code>www-data</code> can't write to a file owned by <code>root</code> with no group
      write access, no matter what chmod says about "others."
    </p>
    <CodeBlock label="terminal">{`sudo chown tobias file.txt          # change the owning user
sudo chown tobias:developers file.txt   # change user AND group at once
sudo chown -R www-data:www-data /var/www/site/   # recursively, common for web apps`}</CodeBlock>
  </div>
)

const SudoNote = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-3">
    <span className="text-sm font-semibold gold-text">A Word On sudo</span>
    <p className="text-white leading-relaxed text-sm">
      <code>sudo</code> ("superuser do") runs a single command as the root user — the one account that bypasses
      permission checks entirely. It's required for anything that touches system files, installs software, or
      manages other users' accounts. It asks for your own password (not root's) and only works if your user is in
      the <code>sudo</code> group. Use it command-by-command rather than opening a permanent root shell
      (<code>sudo su</code>) — it's easy to forget you're root and delete something you didn't mean to.
    </p>
  </div>
)

export const LinuxPermissionsSection = () => (
  <SectionShell
    title="File Permissions & Ownership"
    paragraphs={[
      "Every file and directory on Linux has an owner, a group, and a set of permissions describing what the owner, the group, and everyone else are allowed to do with it. This is the mechanism behind almost every \"permission denied\" error you'll ever hit — and understanding it turns those errors from mysterious into obvious.",
      'There are three permission types, checked for three different sets of people: the owning user, the owning group, and everyone else.',
    ]}
    points={[
      'r (read) — view a file\'s contents, or list a directory\'s contents',
      'w (write) — modify or delete a file, or create/delete files inside a directory',
      'x (execute) — run a file as a program/script, or "enter" a directory with cd',
    ]}
  >
    <div className="space-y-6">
      <PermissionsAnatomy />
      <ChmodSection />
      <OwnershipSection />
      <SudoNote />
    </div>
  </SectionShell>
)
