import { CodeBlock, SectionShell, StepList } from '../Shared'

const SshdConfigSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Locking Down /etc/ssh/sshd_config</span>
    <p className="text-white leading-relaxed text-sm">
      SSH is the single most attacked service on any public server — it gets password-guessed by bots within
      minutes of a new IP going live. Once you've confirmed your SSH key works, these few settings remove almost
      every realistic attack against it.
    </p>
    <CodeBlock label="/etc/ssh/sshd_config">{`PermitRootLogin no          # nobody logs in as root directly, ever
PasswordAuthentication no    # key-only — a stolen/guessed password becomes useless
PubkeyAuthentication yes
X11Forwarding no             # you're not running a GUI app over this connection
MaxAuthTries 3                 # cut off brute-force attempts fast`}</CodeBlock>
    <CodeBlock label="terminal">{`sudo sshd -t                        # validate the config BEFORE restarting — a typo here can lock you out
sudo systemctl restart ssh

# keep your current session open and test in a SECOND terminal before closing this one
ssh sarah@your-server-ip`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      That second-terminal test matters more than anything else on this page — if the new config is broken and
      you've already closed your only working session, you're locked out until you use the provider's web
      console to fix it.
    </p>
  </div>
)

const PortAndFail2banSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Changing The Port & fail2ban</span>
    <p className="text-white leading-relaxed text-sm">
      Moving SSH off port 22 doesn't stop a targeted attacker, but it silences the constant background noise from
      bots scanning the entire internet on that one port — quieter logs, same security. <code>fail2ban</code>{' '}
      does the actual blocking: it watches the auth log and temporarily firewalls any IP that fails login too many
      times.
    </p>
    <CodeBlock label="/etc/ssh/sshd_config">{`Port 2222`}</CodeBlock>
    <CodeBlock label="terminal">{`sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd      # see currently banned IPs and ban count
sudo fail2ban-client set sshd unbanip 1.2.3.4   # manually unban an IP (e.g. if it's you)`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      If you change the port, remember to also update it in your firewall rules (next section) and your own{' '}
      <code>~/.ssh/config</code> — it's an easy way to lock yourself out if you forget one of the two.
    </p>
  </div>
)

export const UbuntuServerSshHardeningSection = () => (
  <SectionShell
    title="Hardening SSH Access"
    paragraphs={[
      "SSH is the front door to every server in this tutorial — everything else assumes it's locked down first. None of this is exotic; it's the same handful of settings every real production server runs.",
    ]}
  >
    <div className="space-y-6">
      <SshdConfigSection />
      <PortAndFail2banSection />
      <StepList
        steps={[
          'Confirm your SSH key logs in successfully BEFORE disabling password authentication',
          'Always keep your current session open while testing a new SSH config in a second window',
          'Never disable both PasswordAuthentication and your only SSH key at once — have a working key confirmed first',
        ]}
      />
    </div>
  </SectionShell>
)
