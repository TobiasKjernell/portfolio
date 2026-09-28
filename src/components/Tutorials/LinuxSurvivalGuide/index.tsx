import { CodeBlock, SectionShell } from '../Shared'

const ProcessManagementSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Keeping Things Running — systemctl & background jobs</span>
    <p className="text-white leading-relaxed text-sm">
      Most long-running software on a server (a web server, a database, your own app) runs as a{' '}
      <code>systemd</code> service, managed with <code>systemctl</code>. That's how it survives reboots and
      restarts itself if it crashes.
    </p>
    <CodeBlock label="terminal">{`sudo systemctl status nginx     # is it running? recent logs?
sudo systemctl start nginx      # start it now
sudo systemctl stop nginx       # stop it
sudo systemctl restart nginx    # stop + start, e.g. after a config change
sudo systemctl enable nginx     # make it auto-start on boot
sudo journalctl -u nginx -f     # follow that service's logs live`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      For a quick one-off command that needs to survive you closing your SSH session, <code>nohup</code> and{' '}
      <code>&</code> keep it running in the background:
    </p>
    <CodeBlock label="terminal">{`nohup python script.py & disown   # runs even after you log out
jobs        # list background jobs in the current shell
fg          # bring the most recent background job back to the foreground`}</CodeBlock>
  </div>
)

const TmuxSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">tmux — Sessions That Survive A Dropped Connection</span>
    <p className="text-white leading-relaxed text-sm">
      If your SSH connection drops, everything running in that terminal dies with it — unless it's inside a{' '}
      <code>tmux</code> session. tmux is a terminal multiplexer: it keeps a session alive on the server itself, so
      you can disconnect and reconnect later and find everything exactly as you left it.
    </p>
    <CodeBlock label="terminal">{`tmux new -s work        # start a new named session called "work"
# ... run anything, close your laptop, go home ...
tmux attach -t work     # reattach to it later, from anywhere
tmux ls                 # list all sessions running on this server

# Inside tmux: Ctrl+b then d  →  detach and leave it running`}</CodeBlock>
  </div>
)

const EditorsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Editing A File Without A GUI</span>
    <p className="text-white leading-relaxed text-sm">
      Every server needs its config files edited eventually. <code>nano</code> is the friendliest starting point —
      the shortcuts are shown at the bottom of the screen the whole time. <code>vim</code> is far more powerful
      but has a real learning curve; the one thing worth memorizing is how to exit it.
    </p>
    <CodeBlock label="terminal">{`nano /etc/nginx/nginx.conf
# Ctrl+O to save, Ctrl+X to exit

vim /etc/nginx/nginx.conf
# press i to start typing (INSERT mode)
# press Esc to stop typing (NORMAL mode)
# type :wq and press Enter to save and quit
# type :q! and press Enter to quit WITHOUT saving`}</CodeBlock>
  </div>
)

const SurvivalHabits = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Habits That Save You From Yourself</span>
    <ul className="space-y-2">
      {[
        'Read the command before pressing Enter — especially anything with rm -rf, sudo, or a wildcard (*). There\'s no undo.',
        'Before editing a config file, copy it first: cp nginx.conf nginx.conf.bak — a broken config is much easier to fix with a working copy next to it.',
        'When something isn\'t working, check the logs before guessing: journalctl -xe, or the app\'s own log file, almost always says exactly what went wrong.',
        'df -h and free -h are your two-second health check — "is the disk full?" and "is memory full?" explain a surprising number of mystery problems.',
        'history | grep something finds a command you ran before but can\'t quite remember.',
      ].map((tip) => (
        <li
          key={tip}
          className="flex gap-3 text-gray-300 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20"
        >
          <span className="gold-text">→</span>
          {tip}
        </li>
      ))}
    </ul>
  </div>
)

export const LinuxSurvivalGuideSection = () => (
  <SectionShell
    title="How To Survive In Linux"
    paragraphs={[
      "The commands above get you moving, but a handful of extra habits are what separate someone who can limp through a terminal from someone who's actually comfortable there. This section is the practical, day-to-day stuff — keeping things running, not losing work when a connection drops, and not panicking when something breaks.",
    ]}
  >
    <div className="space-y-6">
      <ProcessManagementSection />
      <TmuxSection />
      <EditorsSection />
      <SurvivalHabits />
    </div>
  </SectionShell>
)
