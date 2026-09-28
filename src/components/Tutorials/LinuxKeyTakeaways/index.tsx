import { SectionShell } from '../Shared'

export const LinuxKeyTakeawaysSection = () => (
  <SectionShell
    title="Key Takeaways"
    paragraphs={[
      "Linux rewards muscle memory over memorization — the same twenty or so commands cover the vast majority of what you'll do day to day, and everything else is one man <command> or --help away.",
    ]}
    points={[
      'The kernel is "Linux" — everything else (shell, utilities, package manager, desktop) is what makes a distro; Ubuntu, Debian and Fedora all share the same core underneath',
      'Permissions are just three yes/no questions asked three times over — can the owner, the group, and everyone else read/write/execute this',
      "Give people and services their own accounts, put them in the right groups, and use sudo per command instead of living as root",
      'apt (or your distro\'s equivalent) is how software gets installed — not downloading random binaries off the internet',
      'SSH with a key pair, not a password, is how you\'ll touch almost every real server you ever manage',
      'Ubuntu Server is not a different OS from Ubuntu Desktop — it\'s the same system with the GUI left out',
      'tmux and systemctl are what keep work running when your connection drops or the server reboots — learn both before you need them in a panic',
    ]}
  />
)
