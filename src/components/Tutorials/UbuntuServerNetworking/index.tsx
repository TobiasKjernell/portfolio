import { CodeBlock, SectionShell } from '../Shared'

const NetplanSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Netplan — How Ubuntu Server Configures Networking</span>
    <p className="text-white leading-relaxed text-sm">
      Ubuntu Server configures its network interfaces through YAML files under{' '}
      <code>/etc/netplan/</code>, applied with the <code>netplan</code> command. Most cloud VMs already come with
      DHCP configured correctly out of the box — you'll mainly touch this for a static IP on a private network or
      a bare-metal box.
    </p>
    <CodeBlock label="/etc/netplan/50-cloud-init.yaml">{`network:
  version: 2
  ethernets:
    eth0:
      dhcp4: true           # most servers just use DHCP — the cloud provider's router hands out the IP

# For a static IP instead:
#    eth0:
#      dhcp4: false
#      addresses: [192.168.1.50/24]
#      routes:
#        - to: default
#          via: 192.168.1.1
#      nameservers:
#        addresses: [1.1.1.1, 8.8.8.8]`}</CodeBlock>
    <CodeBlock label="terminal">{`sudo netplan try      # applies the config, auto-reverts after 120s if you lose connectivity
sudo netplan apply    # applies it for real, once you're confident it's correct

ip addr show          # confirm the interface and IP
ip route               # confirm the default gateway`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      <code>netplan try</code> exists specifically so a typo in a remote server's network config can't lock you
      out permanently — always prefer it over <code>apply</code> when you're not 100% sure the config is right.
    </p>
  </div>
)

const DnsAndHostsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">DNS & /etc/hosts</span>
    <CodeBlock label="terminal">{`resolvectl status        # see which DNS servers are actually in use
dig example.com           # query DNS directly, bypassing any local cache
nslookup example.com      # an older, simpler alternative to dig`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      <code>/etc/hosts</code> lets you hardcode a hostname-to-IP mapping that skips DNS entirely — useful for
      giving internal servers friendly names on a private network, or testing a domain against a new server
      before its real DNS record is switched over.
    </p>
    <CodeBlock label="/etc/hosts">{`127.0.0.1   localhost
10.0.0.5    db-01
10.0.0.6    db-01.internal`}</CodeBlock>
  </div>
)

const PortsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Checking What's Actually Listening</span>
    <CodeBlock label="terminal">{`sudo ss -tulpn
# -t tcp  -u udp  -l listening sockets only  -p show the owning process  -n numeric ports

sudo ss -tulpn | grep :80       # is anything bound to port 80?
curl -I http://localhost          # does the local web server actually respond?`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      <code>ss</code> is the modern replacement for the older <code>netstat</code> — reach for it first whenever
      a service "isn't reachable" to confirm it's actually listening before blaming the firewall or DNS.
    </p>
  </div>
)

export const UbuntuServerNetworkingSection = () => (
  <SectionShell
    title="Networking"
    paragraphs={[
      "Most of the time, networking on a cloud VM just works via DHCP and you never touch it. It's worth understanding anyway, because every networking problem — can't SSH in, a site not loading, a service that can't reach a database — gets diagnosed with the same small set of tools below.",
    ]}
  >
    <div className="space-y-6">
      <NetplanSection />
      <DnsAndHostsSection />
      <PortsSection />
    </div>
  </SectionShell>
)
