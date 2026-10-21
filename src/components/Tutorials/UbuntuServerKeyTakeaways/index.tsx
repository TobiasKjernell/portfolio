import { SectionShell } from '../Shared'

export const UbuntuServerKeyTakeawaysSection = () => (
  <SectionShell
    title="Key Takeaways"
    paragraphs={[
      "Running Ubuntu Server well isn't about knowing every tool — it's a small set of habits, applied consistently, that turn a server from something fragile into something you barely have to think about.",
    ]}
    points={[
      'Stick to LTS releases — years of security patches on a stable, well-tested base beats chasing the newest version',
      'Harden SSH and the firewall before anything else — they\'re the front door, and everything else assumes it\'s locked',
      'Automate patching (unattended-upgrades) and renewal (certbot) — security that depends on remembering eventually fails',
      'Run real services as systemd units, not background shell commands — restart-on-failure and boot persistence come for free',
      'Containers (Docker) are the default way most real apps get deployed today, sitting behind an Nginx reverse proxy that owns TLS',
      'Back up data, ship it off the server, and actually test the restore at least once',
      'A healthy server is mostly boring — if you\'re SSHing in often just to keep it alive, something upstream of that needs fixing',
    ]}
  />
)
