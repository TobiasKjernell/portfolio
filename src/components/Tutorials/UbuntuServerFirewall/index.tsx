import { CodeBlock, SectionShell } from '../Shared'

const UfwBasicsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">ufw — A Friendly Front-End For iptables</span>
    <p className="text-white leading-relaxed text-sm">
      The kernel's real firewall (<code>iptables</code>/<code>nftables</code>) is powerful but awkward to write
      rules for directly. <code>ufw</code> ("uncomplicated firewall") is Ubuntu's own front-end for it — a few
      readable commands instead of raw rule syntax.
    </p>
    <CodeBlock label="terminal">{`sudo ufw default deny incoming     # block everything by default...
sudo ufw default allow outgoing    # ...but let the server reach out freely (updates, APIs, etc.)

sudo ufw allow 2222/tcp              # your SSH port — do this BEFORE enabling, or you'll lock yourself out
sudo ufw allow 80/tcp                 # HTTP
sudo ufw allow 443/tcp                 # HTTPS

sudo ufw enable                        # turns it on — asks for confirmation since it can drop your SSH session
sudo ufw status verbose                 # see every active rule`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      The order matters: always allow your SSH port first. Enabling the firewall with deny-by-default and no SSH
      rule yet is one of the most common ways people accidentally lock themselves out of a fresh server.
    </p>
  </div>
)

const AppProfilesSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Named Rules & App Profiles</span>
    <p className="text-white leading-relaxed text-sm">
      Many packages (Nginx, Apache) register a ufw "application profile" on install, so you can allow them by
      name instead of memorizing port numbers.
    </p>
    <CodeBlock label="terminal">{`sudo ufw app list                 # see every registered profile
sudo ufw allow 'Nginx Full'         # opens both 80 and 443 in one rule
sudo ufw allow from 10.0.0.0/24 to any port 5432   # only let your private network reach Postgres

sudo ufw delete allow 80/tcp        # remove a rule you no longer need
sudo ufw status numbered              # list rules with index numbers, for precise deletion`}</CodeBlock>
  </div>
)

export const UbuntuServerFirewallSection = () => (
  <SectionShell
    title="Firewall With UFW"
    paragraphs={[
      "A firewall is the simplest, highest-leverage security control a server has: close every port except the ones a real service actually needs, so a misconfigured or forgotten service can't quietly become an open door.",
    ]}
  >
    <div className="space-y-6">
      <UfwBasicsSection />
      <AppProfilesSection />
    </div>
  </SectionShell>
)
