import { Link } from 'react-router-dom'
import { WhatIsSystemDesignSection } from '../../../components/Tutorials/WhatIsSystemDesign'
import { ScalabilitySection } from '../../../components/Tutorials/Scalability'
import { AvailabilitySection } from '../../../components/Tutorials/Availability'
import { CapTheoremSection } from '../../../components/Tutorials/CapTheorem'
import { LoadBalancingSection } from '../../../components/Tutorials/LoadBalancing'
import { CachingSection } from '../../../components/Tutorials/Caching'
import { DatabasesSection } from '../../../components/Tutorials/Databases'
import { CdnSection } from '../../../components/Tutorials/Cdn'
import { MessageQueuesSection } from '../../../components/Tutorials/MessageQueues'
import { ArchitectureSection } from '../../../components/Tutorials/Architecture'
import { KeyTakeawaysSection } from '../../../components/Tutorials/KeyTakeaways'
import { SectionMenu } from './SectionMenu'
import { MobileSectionMenu } from './MobileSectionMenu'

const SystemDesignPage = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold gold-text">System Design</h1>
          <p className="text-gray-400 text-sm md:text-base">
            A practical overview of the concepts behind designing systems that scale.
          </p>
        </header>

        <MobileSectionMenu />

        <div className="flex gap-12">
          <aside className="hidden lg:block w-56 shrink-0">
            <SectionMenu />
          </aside>

          <div className="flex-1 min-w-0 max-w-3xl space-y-12">
            <div id="what-is-system-design" className="scroll-mt-8">
              <WhatIsSystemDesignSection />
            </div>
            <div id="scalability" className="scroll-mt-8">
              <ScalabilitySection />
            </div>
            <div id="availability" className="scroll-mt-8">
              <AvailabilitySection />
            </div>
            <div id="cap-theorem" className="scroll-mt-8">
              <CapTheoremSection />
            </div>
            <div id="load-balancing" className="scroll-mt-8">
              <LoadBalancingSection />
            </div>
            <div id="caching" className="scroll-mt-8">
              <CachingSection />
            </div>
            <div id="databases" className="scroll-mt-8">
              <DatabasesSection />
            </div>
            <div id="cdn" className="scroll-mt-8">
              <CdnSection />
            </div>
            <div id="message-queues" className="scroll-mt-8">
              <MessageQueuesSection />
            </div>
            <div id="architecture" className="scroll-mt-8">
              <ArchitectureSection />
            </div>
            <div id="key-takeaways" className="scroll-mt-8">
              <KeyTakeawaysSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemDesignPage
