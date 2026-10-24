import { CodeBlock, Panel, SectionShell } from '../Shared'

const CronSyntaxDiagram = () => (
  <Panel
    label="Reading A Crontab Line"
    caption="Five time fields, then the command to run — any field left as * means 'every'"
  >
    <div className="w-full font-mono text-xs text-gray-300 bg-[#1a1a1a] rounded-lg p-4 space-y-2">
      <div>
        <span className="text-emerald-400">0</span> <span className="text-orange-300">2</span>{' '}
        <span className="text-sky-400">*</span> <span className="text-pink-300">*</span>{' '}
        <span className="text-teal-300">*</span>{' '}
        <span className="text-gray-500">/opt/scripts/backup.sh</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2 text-[11px]">
        <div><span className="text-emerald-400">minute</span> 0–59</div>
        <div><span className="text-orange-300">hour</span> 0–23</div>
        <div><span className="text-sky-400">day of month</span> 1–31</div>
        <div><span className="text-pink-300">month</span> 1–12</div>
        <div><span className="text-teal-300">day of week</span> 0–6 (Sun=0)</div>
      </div>
    </div>
  </Panel>
)

const CrontabBasicsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">crontab — The Classic Way To Schedule A Job</span>
    <CodeBlock label="terminal">{`crontab -e        # edit YOUR OWN crontab (opens in your default editor)
crontab -l         # list your current scheduled jobs
crontab -r          # remove ALL of your scheduled jobs — careful, no confirmation`}</CodeBlock>
    <CodeBlock label="crontab -e">{`# Every day at 2am
0 2 * * * /opt/scripts/backup.sh

# Every 15 minutes
*/15 * * * * /opt/scripts/healthcheck.sh

# Every Monday at 9am
0 9 * * 1 /opt/scripts/weekly-report.sh

# Twice a day, midnight and noon
0 0,12 * * * /opt/scripts/sync.sh`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      A system-wide job that should run as a specific user (not necessarily you) goes in{' '}
      <code>/etc/crontab</code> or a file under <code>/etc/cron.d/</code> instead — those have one extra field for
      the username, right before the command.
    </p>
  </div>
)

const LoggingAndGotchasSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Mistakes Everyone Makes With cron</span>
    <p className="text-white leading-relaxed text-sm">
      cron jobs run in a minimal environment — no <code>PATH</code> set up the way your login shell has it, no
      working directory you'd expect, and output that silently vanishes unless you redirect it yourself.
    </p>
    <CodeBlock label="crontab -e">{`# Bad: relies on your shell's PATH and assumes a working directory
* * * * * backup.sh

# Good: absolute paths everywhere, output captured
0 2 * * * /usr/bin/bash /opt/scripts/backup.sh >> /var/log/backup.log 2>&1`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      Always use the full path to both the interpreter and the script, and always redirect stdout/stderr to a log
      file — otherwise a cron job that starts failing can fail silently for months before anyone notices.
    </p>
  </div>
)

const SystemdTimersSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">systemd Timers — The Modern Alternative</span>
    <p className="text-white leading-relaxed text-sm">
      For anything on a server already managed with systemd (see the systemd section earlier), a timer unit is
      often the better fit — it gets proper logging in <code>journalctl</code> for free, can depend on other
      units, and survives a missed run (e.g. the server was off) with <code>Persistent=true</code>.
    </p>
    <CodeBlock label="/etc/systemd/system/backup.service">{`[Unit]
Description=Run the backup script

[Service]
Type=oneshot
ExecStart=/opt/scripts/backup.sh`}</CodeBlock>
    <CodeBlock label="/etc/systemd/system/backup.timer">{`[Unit]
Description=Run backup.service daily at 2am

[Timer]
OnCalendar=*-*-* 02:00:00
Persistent=true

[Install]
WantedBy=timers.target`}</CodeBlock>
    <CodeBlock label="terminal">{`sudo systemctl daemon-reload
sudo systemctl enable --now backup.timer

systemctl list-timers                 # see every scheduled timer and when it next runs
journalctl -u backup.service           # the job's actual logs — no manual redirection needed
sudo systemctl start backup.service     # trigger it manually, to test it right now`}</CodeBlock>
  </div>
)

export const UbuntuServerCronSection = () => (
  <SectionShell
    title="Scheduled Tasks (cron & systemd Timers)"
    paragraphs={[
      "Most of what keeps a server running smoothly without daily attention — backups, cleanup, health checks, report generation — is really just a script and a schedule. cron is the classic, universal way to do that; systemd timers are the modern alternative that fits more naturally on a server already built around systemd units.",
    ]}
  >
    <div className="space-y-6">
      <CronSyntaxDiagram />
      <CrontabBasicsSection />
      <LoggingAndGotchasSection />
      <SystemdTimersSection />
    </div>
  </SectionShell>
)
