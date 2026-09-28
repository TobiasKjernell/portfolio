import { CodeBlock, SectionShell, StepList } from '../Shared'

const CreatingUsersSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Creating & Managing Users</span>
    <p className="text-white leading-relaxed text-sm">
      Every process and file on Linux belongs to a user. On a shared server, giving each person their own account
      — instead of everyone sharing one login — keeps actions traceable and lets you control exactly what each
      person can touch.
    </p>
    <CodeBlock label="terminal">{`sudo adduser sarah          # interactive: sets password, full name, etc.
sudo useradd -m sarah       # non-interactive, -m creates a home directory

sudo passwd sarah           # (re)set a user's password
sudo deluser sarah          # remove a user (add --remove-home to also delete their files)

id sarah                    # show sarah's user id, group id, and group memberships
whoami                      # show who you're currently logged in as`}</CodeBlock>
  </div>
)

const GroupsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Groups — Managing Access In Bulk</span>
    <p className="text-white leading-relaxed text-sm">
      A group is just a named set of users. Instead of giving five people individual permission to a folder, you
      put them all in one group and give the group permission once. The most important group on any Ubuntu system
      is <code>sudo</code> — membership in it is what lets a user run <code>sudo</code> at all.
    </p>
    <CodeBlock label="terminal">{`sudo usermod -aG sudo sarah     # add sarah to the sudo group (-a = append, don't replace)
sudo usermod -aG docker sarah   # add sarah to the docker group, so she can run docker without sudo

groups sarah                    # list every group sarah belongs to
cat /etc/group                  # see every group on the system and its members`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      Group membership only takes effect on a user's <em>next</em> login (or a fresh shell) — if you just added
      yourself to a group, log out and back in before assuming it didn't work.
    </p>
  </div>
)

const SwitchingUsersSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Switching Users & Elevating Privilege</span>
    <CodeBlock label="terminal">{`su sarah          # switch to sarah's shell (asks for sarah's password)
su -              # switch to root, loading root's own environment/profile
sudo -i           # the safer way to get a root shell, using YOUR password
sudo -u sarah cmd # run a single command as sarah, without switching shells`}</CodeBlock>
  </div>
)

export const LinuxUserManagementSection = () => (
  <SectionShell
    title="User Management"
    paragraphs={[
      "Linux was built from day one to be a multi-user system — even a personal laptop technically supports many separate accounts, each with their own home directory, permissions and processes. On a server this stops being theoretical: every teammate who touches the box, and every service that runs on it, should usually have its own account.",
    ]}
  >
    <div className="space-y-6">
      <CreatingUsersSection />
      <GroupsSection />
      <SwitchingUsersSection />
      <StepList
        steps={[
          'Never SSH in and work as root directly — create a personal account, add it to the sudo group, and use sudo per command',
          "Give each service its own dedicated, low-privilege user (e.g. www-data) instead of running it as your personal account or root",
          'When someone leaves the team, delete or lock their account (sudo passwd -l username) rather than just changing a shared password',
        ]}
      />
    </div>
  </SectionShell>
)
