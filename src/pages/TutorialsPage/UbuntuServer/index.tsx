import { Link } from 'react-router-dom'
import { WhatIsUbuntuServerSection } from '../../../components/Tutorials/WhatIsUbuntuServer'
import { UbuntuServerSetupSection } from '../../../components/Tutorials/UbuntuServerSetup'
import { UbuntuServerNetworkingSection } from '../../../components/Tutorials/UbuntuServerNetworking'
import { UbuntuServerSshHardeningSection } from '../../../components/Tutorials/UbuntuServerSshHardening'
import { UbuntuServerFirewallSection } from '../../../components/Tutorials/UbuntuServerFirewall'
import { UbuntuServerUpdatesSection } from '../../../components/Tutorials/UbuntuServerUpdates'
import { UbuntuServerSystemdSection } from '../../../components/Tutorials/UbuntuServerSystemd'
import { UbuntuServerWebServerSection } from '../../../components/Tutorials/UbuntuServerWebServer'
import { UbuntuServerDockerSection } from '../../../components/Tutorials/UbuntuServerDocker'
import { UbuntuServerMonitoringSection } from '../../../components/Tutorials/UbuntuServerMonitoring'
import { UbuntuServerBackupsSection } from '../../../components/Tutorials/UbuntuServerBackups'
import { UbuntuServerBestPracticesSection } from '../../../components/Tutorials/UbuntuServerBestPractices'
import { UbuntuServerKeyTakeawaysSection } from '../../../components/Tutorials/UbuntuServerKeyTakeaways'
import { SectionMenu } from './SectionMenu'
import { MobileSectionMenu } from './MobileSectionMenu'

const UbuntuServerPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white noScrollbar">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <Link
          to="/tutorials"
          className="inline-flex items-center gap-2 text-sm text-[#cea86f] hover:bg-[#cea86f] hover:text-[#222222] border border-[#cea86f] px-4 py-2 rounded transition-all duration-300 mb-8"
        >
          ← Back to Tutorials
        </Link>

        <header className="mb-12 space-y-3 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold gold-text">Ubuntu Servers</h1>
          <p className="text-gray-400 text-sm md:text-base">
            How Ubuntu Server actually works and how to run one in production today — initial hardening,
            networking, SSH and firewall security, automated patching, systemd services, Nginx + TLS, Docker,
            monitoring, backups, and the daily habits that keep a server boring in the best way.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="https://ubuntu.com/server/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              Ubuntu Server Docs ↗
            </a>
            <a
              href="https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-24-04"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              Initial Server Setup Guide ↗
            </a>
          </div>
        </header>

        <MobileSectionMenu />

        <div className="flex gap-12">
          <aside className="hidden lg:block w-56 shrink-0">
            <SectionMenu />
          </aside>

          <div className="flex-1 min-w-0 max-w-3xl space-y-12">
            <div id="what-is-ubuntu-server" className="scroll-mt-8">
              <WhatIsUbuntuServerSection />
            </div>
            <div id="initial-setup" className="scroll-mt-8">
              <UbuntuServerSetupSection />
            </div>
            <div id="networking" className="scroll-mt-8">
              <UbuntuServerNetworkingSection />
            </div>
            <div id="ssh-hardening" className="scroll-mt-8">
              <UbuntuServerSshHardeningSection />
            </div>
            <div id="firewall" className="scroll-mt-8">
              <UbuntuServerFirewallSection />
            </div>
            <div id="updates" className="scroll-mt-8">
              <UbuntuServerUpdatesSection />
            </div>
            <div id="systemd" className="scroll-mt-8">
              <UbuntuServerSystemdSection />
            </div>
            <div id="web-server" className="scroll-mt-8">
              <UbuntuServerWebServerSection />
            </div>
            <div id="docker" className="scroll-mt-8">
              <UbuntuServerDockerSection />
            </div>
            <div id="monitoring" className="scroll-mt-8">
              <UbuntuServerMonitoringSection />
            </div>
            <div id="backups" className="scroll-mt-8">
              <UbuntuServerBackupsSection />
            </div>
            <div id="best-practices" className="scroll-mt-8">
              <UbuntuServerBestPracticesSection />
            </div>
            <div id="key-takeaways" className="scroll-mt-8">
              <UbuntuServerKeyTakeawaysSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UbuntuServerPage
