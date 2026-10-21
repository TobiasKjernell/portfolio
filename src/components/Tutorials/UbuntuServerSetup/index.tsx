import { CodeBlock, SectionShell, StepList } from '../Shared'

const FirstLoginSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The First Five Minutes On A New Server</span>
    <p className="text-white leading-relaxed text-sm">
      A fresh VM from a cloud provider usually only gives you a root login (or a default user with your SSH key
      already installed). The very first thing to do, before installing anything else, is get off that default
      account and onto a personal one with sudo rights.
    </p>
    <CodeBlock label="terminal — as root, on a brand-new server">{`adduser sarah                  # create your personal account
usermod -aG sudo sarah         # give it sudo rights
rsync --archive --chown=sarah:sarah ~/.ssh /home/sarah
# ^ copies root's authorized_keys to your new user, so key-based login still works

exit
ssh sarah@your-server-ip        # reconnect as the new user
sudo whoami                     # should print "root" — confirms sudo works`}</CodeBlock>
  </div>
)

const SystemBasicsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Hostname, Timezone & A Clean Baseline</span>
    <CodeBlock label="terminal">{`sudo hostnamectl set-hostname web-01       # a name you'll recognize across many servers
sudo timedatectl set-timezone UTC           # UTC everywhere — avoids daylight-saving log confusion
timedatectl                                  # confirm it took effect

sudo apt update && sudo apt upgrade -y       # make sure you start from fully patched
sudo apt install -y ufw fail2ban unattended-upgrades   # the baseline tools the next sections configure
sudo reboot                                   # pick up any kernel update from the upgrade above`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      Using UTC as the system clock, rather than a local timezone, is the single thing that saves the most
      confusion later — every log file, cron job and cross-server comparison lines up without a mental timezone
      conversion.
    </p>
  </div>
)

const SwapSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Adding Swap (Small/Cheap VMs)</span>
    <p className="text-white leading-relaxed text-sm">
      A budget VM (1–2GB RAM) runs out of memory under load far more often than it runs out of disk. A swap file
      gives the kernel somewhere to put rarely-used memory pages instead of killing a process outright.
    </p>
    <CodeBlock label="terminal">{`sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab   # persist across reboots

free -h    # confirm swap is now listed`}</CodeBlock>
  </div>
)

export const UbuntuServerSetupSection = () => (
  <SectionShell
    title="Initial Setup Checklist"
    paragraphs={[
      "Everything that follows in this tutorial assumes these few things are already done — they're the difference between a server that's merely running and one that's actually ready to be trusted with real traffic.",
    ]}
  >
    <div className="space-y-6">
      <FirstLoginSection />
      <SystemBasicsSection />
      <SwapSection />
      <StepList
        steps={[
          "Create a personal sudo user and confirm you can log in with it BEFORE closing your root session",
          'Fully update and reboot once before installing anything real, so you\'re not debugging on top of stale packages',
          "Add swap on anything under ~4GB RAM — it's nearly free insurance against an out-of-memory crash",
        ]}
      />
    </div>
  </SectionShell>
)
