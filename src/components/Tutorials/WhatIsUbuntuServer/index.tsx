import { Arrow, Box, Panel, ProsConsCard, SectionShell } from '../Shared'

const SimpleVersionSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">The Simple Version</span>
    <p className="text-white leading-relaxed text-sm">
      Ubuntu Server is the exact same Ubuntu, with the GUI, office apps and browser left out, built instead to sit
      in a data center or cloud region running one job well — hosting a website, a database, an API, a build
      runner — for months or years without anyone touching it directly. You manage it entirely over SSH, it has
      long-term support releases that get security patches for years, and it's the single most common OS behind
      "the cloud": AWS, DigitalOcean, Hetzner, Linode and GCP all default to it for a reason.
    </p>
    <p className="text-white leading-relaxed text-sm">
      This tutorial assumes you already know the Linux basics — moving around a shell, permissions, users, SSH —
      covered in the Linux Fundamentals tutorial. This one is specifically about running Ubuntu as a production
      server: setting it up safely, keeping it secure and updated, running real services on it, and the habits
      that keep it healthy long after the first day.
    </p>
  </div>
)

const LifecycleDiagram = () => (
  <Panel
    label="A Server's Life, Realistically"
    caption="Most of a server's life is step 4 — the goal of every section below is making that step boring"
  >
    <div className="flex flex-col gap-2 w-full">
      <Box>1. Provision a VM / rent a box</Box>
      <Arrow />
      <Box>2. Initial hardening — user, SSH, firewall, updates</Box>
      <Arrow />
      <Box>3. Install & configure the actual service (web server, DB, app)</Box>
      <Arrow />
      <Box className="border-green-500/60">4. Runs quietly for months — monitored, patched, backed up</Box>
    </div>
  </Panel>
)

const LtsSection = () => (
  <ProsConsCard
    title="Why LTS (Long Term Support) Releases Matter"
    pros={[
      '5 years of free security patches (10 with Ubuntu Pro) — install once, patch for years, no OS reinstall',
      'Package versions are frozen and heavily tested — nothing changes under you between patch releases',
      'What almost every tutorial, Docker base image and cloud provider defaults to and tests against',
    ]}
    cons={[
      'Software versions are older by design — a brand-new language runtime may not be packaged yet',
      'Upgrading between LTS versions (do-release-upgrade) is a bigger, riskier event than a normal apt upgrade',
    ]}
  />
)

export const WhatIsUbuntuServerSection = () => (
  <SectionShell
    title="What Is Ubuntu Server"
    paragraphs={[
      "\"Ubuntu Server\" isn't a different kernel or a stripped-down clone of Ubuntu — it's Ubuntu, installed and configured with no desktop environment, aimed at running headless (no monitor, no mouse) as a long-lived service rather than a daily-driver workstation.",
      'As of today, the current LTS release is Ubuntu 24.04 LTS ("Noble Numbat"), supported with security updates into 2029 — almost every command in this tutorial applies identically to any recent LTS version.',
    ]}
    points={[
      'Headless: no GUI, no monitor needed — everything is done over SSH from day one',
      'LTS (Long Term Support): released every 2 years, supported for 5+ years — always the right default for a server',
      'Cloud-init: the standard way cloud providers configure a fresh Ubuntu Server VM automatically on first boot',
      "Package repository: Ubuntu's own curated, security-patched set of software, installed via apt",
    ]}
  >
    <div className="space-y-6">
      <SimpleVersionSection />
      <LifecycleDiagram />
      <LtsSection />
    </div>
  </SectionShell>
)
