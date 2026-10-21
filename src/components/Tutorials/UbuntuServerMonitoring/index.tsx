import { CodeBlock, SectionShell } from '../Shared'

const HealthCheckSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The 30-Second Health Check</span>
    <p className="text-white leading-relaxed text-sm">
      Before digging into anything specific, these five commands answer "is the server itself OK" and explain a
      surprising share of all mystery problems.
    </p>
    <CodeBlock label="terminal">{`uptime           # load average — sustained numbers above your core count mean it's overloaded
free -h           # is memory (or swap) nearly full?
df -h              # is any disk nearly full? a full disk breaks logging, databases, everything
htop               # live view of CPU/memory per process (sudo apt install htop if missing)
systemctl --failed  # any systemd unit that's supposed to be running but isn't`}</CodeBlock>
  </div>
)

const JournaldSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">journalctl — Centralized Logs For Everything</span>
    <p className="text-white leading-relaxed text-sm">
      Every systemd service's output goes into one centralized, structured log instead of scattered text files —
      <code>journalctl</code> is how you query it.
    </p>
    <CodeBlock label="terminal">{`journalctl -u nginx -f               # follow one service's logs live
journalctl -u myapp --since "1 hour ago"
journalctl -p err -b                  # only errors, since the last boot
journalctl --disk-usage                # how much space the journal itself is using
sudo journalctl --vacuum-time=7d         # trim logs older than 7 days, if disk space is tight`}</CodeBlock>
  </div>
)

const LogrotateSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">logrotate — Keeping Plain Log Files From Growing Forever</span>
    <p className="text-white leading-relaxed text-sm">
      Any app that writes its own log file (Nginx's access log, a custom app log) needs something to rotate it,
      or it grows unbounded until it fills the disk. Ubuntu ships <code>logrotate</code>, already configured for
      system services — your own app just needs its own small config.
    </p>
    <CodeBlock label="/etc/logrotate.d/myapp">{`/var/log/myapp/*.log {
    daily
    rotate 14
    compress
    missingok
    notifempty
}`}</CodeBlock>
    <CodeBlock label="terminal">{`sudo logrotate -d /etc/logrotate.d/myapp   # dry run — see what it WOULD do, no changes made`}</CodeBlock>
  </div>
)

const MonitoringToolsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Beyond Manual Checks</span>
    <p className="text-white leading-relaxed text-sm">
      Checking a server by hand doesn't scale past one or two boxes. Once there's more than that, something
      should be watching for you and paging if it goes quiet — a lightweight agent (Netdata, Prometheus's{' '}
      <code>node_exporter</code>) exporting metrics to a dashboard, plus an uptime checker hitting your site from
      the outside, catches almost everything a human staring at <code>htop</code> would eventually notice too
      late.
    </p>
  </div>
)

export const UbuntuServerMonitoringSection = () => (
  <SectionShell
    title="Monitoring, Logs & Troubleshooting"
    paragraphs={[
      "When something breaks, these are the tools that tell you what and why — starting broad (is the machine itself healthy) and narrowing down to one service's logs.",
    ]}
  >
    <div className="space-y-6">
      <HealthCheckSection />
      <JournaldSection />
      <LogrotateSection />
      <MonitoringToolsSection />
    </div>
  </SectionShell>
)
