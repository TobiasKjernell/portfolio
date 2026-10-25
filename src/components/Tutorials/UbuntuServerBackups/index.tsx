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

const CronSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">Scheduling It</span>
    <p className="text-white leading-relaxed text-sm">
      A backup script someone has to remember to run isn't really automated — <code>cron</code> (covered in the
      previous section) is what actually makes it happen reliably, every day, without anyone logged in.
    </p>
    <CodeBlock label="crontab -e">{`# Run every day at 2am
0 2 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1`}</CodeBlock>
  </div>
)

const RsyncSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">rsync — Getting A Copy Off The Server</span>
    <p className="text-white leading-relaxed text-sm">
      A backup that lives only on the same disk as the data it's protecting isn't really a backup — it's gone the
      moment that disk fails. <code>rsync</code> is the standard tool for shipping it somewhere else: it copies
      files over SSH, and — unlike <code>scp</code> or <code>cp</code> — it's smart about it. On every run after
      the first, it compares source and destination and transfers only what actually changed, instead of
      re-sending everything from scratch.
    </p>
    <CodeBlock label="terminal">{`rsync -avz /var/backups/myapp/ sarah@backup-host:/backups/myapp/

# -a  archive mode — preserves permissions, timestamps, symlinks, and recurses into directories
# -v  verbose — lists each file as it's transferred, so you can see it's actually doing something
# -z  compress data during the transfer — faster over a slow link, barely matters on a fast one`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      One easy-to-miss detail: the trailing slash on the source directory matters. <code>myapp/</code> copies the{' '}
      <em>contents</em> of that folder into the destination; <code>myapp</code> (no slash) copies the folder{' '}
      <em>itself</em> into the destination, nesting it one level deeper than you probably wanted.
    </p>
  </div>
)

const DryRunSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">--dry-run — Seeing What Would Happen First</span>
    <p className="text-white leading-relaxed text-sm">
      rsync can delete files on the destination to keep it an exact mirror of the source (<code>--delete</code>),
      which is exactly what you want in a backup — except the first time you run a new or edited command, you're
      trusting it completely untested against real data. <code>--dry-run</code> runs through all the same logic
      and prints exactly what it would copy or delete, without touching a single file.
    </p>
    <CodeBlock label="terminal">{`rsync -avz --delete --dry-run /var/backups/myapp/ sarah@backup-host:/backups/myapp/
# prints every file it WOULD transfer or remove — nothing actually happens yet

# Once the output looks right, run the exact same command with --dry-run removed:
rsync -avz --delete /var/backups/myapp/ sarah@backup-host:/backups/myapp/`}</CodeBlock>
    <p className="text-white leading-relaxed text-sm">
      Reaching for <code>--dry-run</code> any time you add <code>--delete</code>, change a path, or edit a backup
      script at all is a cheap habit that turns "oops, I just wiped the backup" into "good thing I checked first."
    </p>
  </div>
)

const OffsiteToolsSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">rclone — When The Destination Isn't Another Server</span>
    <p className="text-white leading-relaxed text-sm">
      rsync needs an actual SSH-reachable machine on the other end. For shipping backups to object storage
      instead — S3, Backblaze B2, Google Drive — <code>rclone</code> does the same job, speaking each provider's
      own API.
    </p>
    <CodeBlock label="terminal">{`rclone copy /var/backups/myapp remote:myapp-backups
# rclone talks to dozens of storage providers with one config

rclone copy /var/backups/myapp remote:myapp-backups --dry-run
# same idea as rsync — see what it would upload before it actually does`}</CodeBlock>
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
      <CronSection />
      <RsyncSection />
      <DryRunSection />
      <OffsiteToolsSection />
      <RestoreSection />
      <StepList
        steps={[
          'Back up data, not the whole OS — the OS is reproducible, the data usually isn\'t',
          'Always ship a copy somewhere other than the server it came from',
          'Dry-run any rsync command with --delete, or any edited backup script, before trusting it against real data',
          'Actually test a restore at least once — a backup you\'ve never restored is unverified',
        ]}
      />
    </div>
  </SectionShell>
)
