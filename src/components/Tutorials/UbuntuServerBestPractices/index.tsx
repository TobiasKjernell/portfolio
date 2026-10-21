import { ProsConsCard, SectionShell } from '../Shared'

const SECURITY_CHECKLIST: string[] = [
  'No root SSH login, key-only authentication, a non-default SSH port',
  'A firewall (ufw) with a default-deny policy and only the ports actually in use open',
  'fail2ban (or an equivalent) actively banning repeated failed logins',
  'unattended-upgrades installing security patches automatically every day',
  'Every app process runs as its own low-privilege user, never as root',
  'TLS everywhere public-facing — no plain HTTP left reachable from the internet',
]

const OperationsChecklist = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Security Checklist</span>
    <ul className="space-y-2">
      {SECURITY_CHECKLIST.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-gray-300 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20"
        >
          <span className="text-green-400/80">✓</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
)

const DailyUseSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">What Daily Use Actually Looks Like</span>
    <p className="text-white leading-relaxed text-sm">
      On a well-run server, most days involve nothing at all — that's the goal, not a sign you're missing
      something. When you do touch it, it's almost always one of: deploying a new version of your app
      (<code>docker compose pull && up -d</code>, or a CI pipeline doing the same), glancing at{' '}
      <code>journalctl</code> or a dashboard after an alert, applying a non-security update on your own schedule,
      or renewing nothing at all, because certbot and unattended-upgrades already did it overnight.
    </p>
  </div>
)

const SingleBoxVsFleet = () => (
  <ProsConsCard
    title="One Server vs. Several, Managed By Hand"
    pros={[
      'A single well-hardened box, checked periodically, is genuinely fine for most small projects and side projects',
      'Everything in this tutorial is enough on its own up to a handful of servers',
    ]}
    cons={[
      'Past 3–5 servers, doing all of this by hand on each one stops scaling — config drifts, one gets forgotten',
      'That\'s the point configuration management (Ansible) or infrastructure-as-code (Terraform) starts paying for itself — out of scope here, but worth knowing the name once you feel the pain',
    ]}
  />
)

export const UbuntuServerBestPracticesSection = () => (
  <SectionShell
    title="Best Practices Checklist"
    paragraphs={[
      "A condensed checklist of everything above, plus what good, low-drama server ownership actually looks like day to day in 2026.",
    ]}
  >
    <div className="space-y-6">
      <OperationsChecklist />
      <DailyUseSection />
      <SingleBoxVsFleet />
    </div>
  </SectionShell>
)
