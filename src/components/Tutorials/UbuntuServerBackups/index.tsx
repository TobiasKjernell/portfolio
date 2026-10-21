import { CodeBlock, SectionShell, StepList } from '../Shared'

const WhatToBackUpSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">What Actually Needs Backing Up</span>
    <p className="text-white leading-relaxed text-sm">
      Not everything on a server is irreplaceable — the OS and installed packages can be reinstalled from a
      script in minutes. What can't be recreated is data: a database, user-uploaded files, config that took hours
      to get right. Back up the thing that would hurt to lose, not the whole disk.
    </p>
  </div>
)

const DatabaseDumpSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Database Dumps — The Core Of Most Backup Scripts</span>
    <CodeBlock label="backup.sh">{`#!/usr/bin/env bash
set -euo pipefail

backup_dir="/var/backups/myapp"
timestamp=$(date +%Y%m%d-%H%M%S)
mkdir -p "$backup_dir"

# Postgres running in Docker, from the earlier example
docker compose exec -T db pg_dump -U user myapp | gzip > "$backup_dir/myapp-$timestamp.sql.gz"

# Keep only the last 14 days locally
find "$backup_dir" -name "*.sql.gz" -mtime +14 -delete

echo "Backup complete: myapp-$timestamp.sql.gz"`}</CodeBlock>
  </div>
)

const CronAndOffsiteSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Scheduling It & Getting A Copy Off The Server</span>
    <p className="text-white leading-relaxed text-sm">
      A backup that lives only on the same disk as the data it's protecting isn't really a backup — it's gone the
      moment that disk fails. <code>cron</code> runs the script on a schedule; a separate step ships the result
      somewhere else entirely.
    </p>
    <CodeBlock label="crontab -e">{`# Run every day at 2am
0 2 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1`}</CodeBlock>
    <CodeBlock label="terminal — shipping it offsite">{`rclone copy /var/backups/myapp remote:myapp-backups
# rclone talks to S3, Backblaze B2, Google Drive and dozens of other providers with one config

# Or, simpler, straight to another machine you own:
rsync -avz /var/backups/myapp/ sarah@backup-host:/backups/myapp/`}</CodeBlock>
  </div>
)

const RestoreSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Part Everyone Skips — Testing A Restore</span>
    <p className="text-white leading-relaxed text-sm">
      A backup nobody has ever restored from is a hypothesis, not a safety net. Periodically prove it actually
      works, ideally on a throwaway VM, not production.
    </p>
    <CodeBlock label="terminal">{`gunzip -c myapp-20260115-020000.sql.gz | docker compose exec -T db psql -U user myapp`}</CodeBlock>
  </div>
)

export const UbuntuServerBackupsSection = () => (
  <SectionShell
    title="Backups & Disaster Recovery"
    paragraphs={[
      "Everything else in this tutorial is about keeping a server running smoothly — this section is about what happens when that fails anyway: a bad deploy, a corrupted database, a provider losing a disk entirely.",
    ]}
  >
    <div className="space-y-6">
      <WhatToBackUpSection />
      <DatabaseDumpSection />
      <CronAndOffsiteSection />
      <RestoreSection />
      <StepList
        steps={[
          'Back up data, not the whole OS — the OS is reproducible, the data usually isn\'t',
          'Always ship a copy somewhere other than the server it came from',
          'Actually test a restore at least once — a backup you\'ve never restored is unverified',
        ]}
      />
    </div>
  </SectionShell>
)
