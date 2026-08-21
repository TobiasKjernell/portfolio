import { Link } from 'react-router-dom'
import { WhatIsCiCdSection } from '../../../components/Tutorials/WhatIsCiCd'
import { HowCiWorksSection } from '../../../components/Tutorials/HowCiWorks'
import { HowCdWorksSection } from '../../../components/Tutorials/HowCdWorks'
import { CiCdPipelineAnatomySection } from '../../../components/Tutorials/CiCdPipelineAnatomy'
import { CiCdToolsSection } from '../../../components/Tutorials/CiCdTools'
import { CiCdPipelineExampleSection } from '../../../components/Tutorials/CiCdPipelineExample'
import { DeploymentStrategiesSection } from '../../../components/Tutorials/DeploymentStrategies'
import { CiCdKeyTakeawaysSection } from '../../../components/Tutorials/CiCdKeyTakeaways'
import { SectionMenu } from './SectionMenu'
import { MobileSectionMenu } from './MobileSectionMenu'

const CiCdFundamentalsPage = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold gold-text">CI/CD Fundamentals</h1>
          <p className="text-gray-400 text-sm md:text-base">
            What continuous integration and continuous delivery actually mean, how a pipeline runs from a commit
            to a running production app, and the different ways teams build one — explained from zero.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="https://docs.github.com/en/actions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              GitHub Actions Docs ↗
            </a>
            <a
              href="https://docs.gitlab.com/ee/ci/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              GitLab CI/CD Docs ↗
            </a>
          </div>
        </header>

        <MobileSectionMenu />

        <div className="flex gap-12">
          <aside className="hidden lg:block w-56 shrink-0">
            <SectionMenu />
          </aside>

          <div className="flex-1 min-w-0 max-w-3xl space-y-12">
            <div id="what-is-cicd" className="scroll-mt-8">
              <WhatIsCiCdSection />
            </div>
            <div id="how-ci-works" className="scroll-mt-8">
              <HowCiWorksSection />
            </div>
            <div id="how-cd-works" className="scroll-mt-8">
              <HowCdWorksSection />
            </div>
            <div id="anatomy-of-a-pipeline" className="scroll-mt-8">
              <CiCdPipelineAnatomySection />
            </div>
            <div id="cicd-tools" className="scroll-mt-8">
              <CiCdToolsSection />
            </div>
            <div id="a-real-pipeline" className="scroll-mt-8">
              <CiCdPipelineExampleSection />
            </div>
            <div id="deployment-strategies" className="scroll-mt-8">
              <DeploymentStrategiesSection />
            </div>
            <div id="key-takeaways" className="scroll-mt-8">
              <CiCdKeyTakeawaysSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CiCdFundamentalsPage
