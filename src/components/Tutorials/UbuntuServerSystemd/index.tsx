import { CodeBlock, SectionShell } from '../Shared'

const DailyCommandsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Commands You'll Run Every Day</span>
    <p className="text-white leading-relaxed text-sm">
      Almost everything long-running on Ubuntu Server — the web server, the database, your own app — runs as a{' '}
      <code>systemd</code> service, managed with <code>systemctl</code>. This is the real daily-use core of
      server administration: starting, stopping, and checking on services.
    </p>
    <CodeBlock label="terminal">{`sudo systemctl status nginx       # is it running? recent log lines? what triggered the last restart?
sudo systemctl start nginx         # start it
sudo systemctl stop nginx           # stop it
sudo systemctl restart nginx         # stop + start — e.g. after a config change
sudo systemctl reload nginx           # re-read config WITHOUT dropping active connections (when supported)
sudo systemctl enable nginx            # auto-start on boot
sudo systemctl disable nginx            # don't auto-start on boot

systemctl list-units --type=service --state=running   # everything currently running on this box`}</CodeBlock>
  </div>
)

const WritingAUnitSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Writing Your Own Service — Running Your App Like A Real One</span>
    <p className="text-white leading-relaxed text-sm">
      Your own app (a Node API, a Python worker, anything that needs to "just stay running") deserves the exact
      same treatment as Nginx — a unit file, not a <code>nohup</code> command someone has to remember to re-run
      after a reboot.
    </p>
    <CodeBlock label="/etc/systemd/system/myapp.service">{`[Unit]
Description=My App API
After=network.target

[Service]
Type=simple
User=myapp
WorkingDirectory=/opt/myapp
ExecStart=/usr/bin/node /opt/myapp/server.js
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target`}</CodeBlock>
    <CodeBlock label="terminal">{`sudo systemctl daemon-reload       # re-read unit files after creating/editing one
sudo systemctl enable --now myapp    # enable on boot AND start it right now
sudo journalctl -u myapp -f           # follow its logs live`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      <code>Restart=on-failure</code> is what makes this worth doing over a background shell command — if the app
      crashes at 3am, systemd restarts it automatically instead of it staying down until someone notices.
    </p>
  </div>
)

export const UbuntuServerSystemdSection = () => (
  <SectionShell
    title="Managing Services With systemd"
    paragraphs={[
      "This is where most of your actual day-to-day time on a server goes: checking whether something is running, restarting it after a deploy, and reading its logs when it isn't behaving. Getting fluent with systemctl pays off constantly.",
    ]}
  >
    <div className="space-y-6">
      <DailyCommandsSection />
      <WritingAUnitSection />
    </div>
  </SectionShell>
)
