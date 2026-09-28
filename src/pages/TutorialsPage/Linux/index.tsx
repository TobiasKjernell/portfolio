import { Link } from 'react-router-dom'
import { WhatIsLinuxSection } from '../../../components/Tutorials/WhatIsLinux'
import { LinuxEssentialCommandsSection } from '../../../components/Tutorials/LinuxEssentialCommands'
import { LinuxPermissionsSection } from '../../../components/Tutorials/LinuxPermissions'
import { LinuxUserManagementSection } from '../../../components/Tutorials/LinuxUserManagement'
import { LinuxPackageManagementSection } from '../../../components/Tutorials/LinuxPackageManagement'
import { LinuxSshSection } from '../../../components/Tutorials/LinuxSsh'
import { UbuntuVsServerSection } from '../../../components/Tutorials/UbuntuVsServer'
import { LinuxSurvivalGuideSection } from '../../../components/Tutorials/LinuxSurvivalGuide'
import { LinuxKeyTakeawaysSection } from '../../../components/Tutorials/LinuxKeyTakeaways'
import { SectionMenu } from './SectionMenu'
import { MobileSectionMenu } from './MobileSectionMenu'

const LinuxFundamentalsPage = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold gold-text">Linux Fundamentals</h1>
          <p className="text-gray-400 text-sm md:text-base">
            An introduction to Linux from zero — essential commands, permissions, user management, connecting over
            SSH, the difference between Ubuntu and Ubuntu Server, and the everyday habits that make a terminal feel
            like home.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="https://ubuntu.com/tutorials"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              Ubuntu Tutorials ↗
            </a>
            <a
              href="https://www.openssh.com/manual.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              OpenSSH Manual ↗
            </a>
          </div>
        </header>

        <MobileSectionMenu />

        <div className="flex gap-12">
          <aside className="hidden lg:block w-56 shrink-0">
            <SectionMenu />
          </aside>

          <div className="flex-1 min-w-0 max-w-3xl space-y-12">
            <div id="what-is-linux" className="scroll-mt-8">
              <WhatIsLinuxSection />
            </div>
            <div id="essential-commands" className="scroll-mt-8">
              <LinuxEssentialCommandsSection />
            </div>
            <div id="permissions" className="scroll-mt-8">
              <LinuxPermissionsSection />
            </div>
            <div id="user-management" className="scroll-mt-8">
              <LinuxUserManagementSection />
            </div>
            <div id="package-management" className="scroll-mt-8">
              <LinuxPackageManagementSection />
            </div>
            <div id="ssh" className="scroll-mt-8">
              <LinuxSshSection />
            </div>
            <div id="ubuntu-vs-server" className="scroll-mt-8">
              <UbuntuVsServerSection />
            </div>
            <div id="survival-guide" className="scroll-mt-8">
              <LinuxSurvivalGuideSection />
            </div>
            <div id="key-takeaways" className="scroll-mt-8">
              <LinuxKeyTakeawaysSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinuxFundamentalsPage
