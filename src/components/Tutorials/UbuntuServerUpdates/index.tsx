import { CodeBlock, SectionShell } from '../Shared'

const ManualUpdatesSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Routine You'll Run By Hand Anyway</span>
    <CodeBlock label="terminal">{`sudo apt update              # refresh the package index
sudo apt list --upgradable     # see what's available before committing
sudo apt upgrade -y             # install newer versions of installed packages
sudo apt autoremove -y           # clean up packages nothing depends on anymore

# After a kernel update, check if a reboot is actually required:
[ -f /var/run/reboot-required ] && echo "Reboot needed"`}</CodeBlock>
  </div>
)

const UnattendedUpgradesSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">unattended-upgrades — Security Patches Without Waiting On You</span>
    <p className="text-white leading-relaxed text-sm">
      A server that only gets patched when someone remembers to SSH in and run <code>apt upgrade</code> is a
      server that's unpatched most of the time. <code>unattended-upgrades</code> installs security updates
      automatically, every day, without needing anyone logged in.
    </p>
    <CodeBlock label="terminal">{`sudo apt install unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades   # interactive on/off prompt`}</CodeBlock>
    <CodeBlock label="/etc/apt/apt.conf.d/50unattended-upgrades">{`Unattended-Upgrade::Allowed-Origins {
    "${'$'}{distro_id}:${'$'}{distro_codename}-security";
};
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "03:00";  // reboot at 3am IF one is actually needed`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      Scoping it to just the <code>-security</code> origin (the default) means you get critical patches
      automatically without regular package upgrades silently changing version behavior underneath you.
    </p>
    <CodeBlock label="terminal — verifying it's actually running">{`sudo systemctl status unattended-upgrades
cat /var/log/unattended-upgrades/unattended-upgrades.log`}</CodeBlock>
  </div>
)

export const UbuntuServerUpdatesSection = () => (
  <SectionShell
    title="Updates & Patching"
    paragraphs={[
      "A server that never gets patched is a server slowly accumulating known, public vulnerabilities. This is the one piece of maintenance worth fully automating rather than relying on memory — everything else in this section is about making sure it's actually happening.",
    ]}
  >
    <div className="space-y-6">
      <ManualUpdatesSection />
      <UnattendedUpgradesSection />
    </div>
  </SectionShell>
)
