import { CodeBlock, SectionShell } from '../Shared'

const AptSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">apt — Ubuntu & Debian's Package Manager</span>
    <p className="text-white leading-relaxed text-sm">
      Instead of downloading installers from random websites, Linux distros ship with a package manager: a tool
      that installs, updates and removes software from trusted, centralized repositories. On Ubuntu (and Debian)
      that's <code>apt</code>.
    </p>
    <CodeBlock label="terminal">{`sudo apt update              # refresh the local list of available packages (do this often)
sudo apt upgrade             # install newer versions of already-installed packages
sudo apt install nginx       # install a package
sudo apt remove nginx        # remove a package, keeping its config files
sudo apt purge nginx         # remove a package AND its config files
sudo apt autoremove          # clean up packages that were only installed as dependencies

apt search "text editor"     # search for a package by name/description
apt show nginx               # show details about a package before installing it`}</CodeBlock>
  </div>
)

const OtherDistrosSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Other Distros, Same Idea</span>
    <p className="text-white leading-relaxed text-sm">
      Every major distro has its own package manager, but they all solve the exact same problem the exact same
      way — only the command name changes.
    </p>
    <ul className="space-y-2">
      {[
        { distro: 'Fedora / RHEL / CentOS', cmd: 'dnf install nginx' },
        { distro: 'Arch / Manjaro', cmd: 'pacman -S nginx' },
        { distro: 'openSUSE', cmd: 'zypper install nginx' },
      ].map(({ distro, cmd }) => (
        <li
          key={distro}
          className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20"
        >
          <span className="gold-text shrink-0 sm:w-44">{distro}</span>
          <code className="text-gray-300">{cmd}</code>
        </li>
      ))}
    </ul>
  </div>
)

export const LinuxPackageManagementSection = () => (
  <SectionShell
    title="Installing Software"
    paragraphs={[
      "One of the biggest differences from Windows/macOS is how software gets installed: rather than downloading a .exe or .dmg from a website, you almost always pull software from your distro's package manager, which handles dependencies, updates and clean removal for you automatically.",
    ]}
  >
    <div className="space-y-6">
      <AptSection />
      <OtherDistrosSection />
    </div>
  </SectionShell>
)
