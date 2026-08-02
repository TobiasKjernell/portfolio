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

const SystemDesignPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white noScrollbar">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          to="/tutorials"
          className="inline-flex items-center gap-2 text-sm text-[#cea86f] hover:bg-[#cea86f] hover:text-[#222222] border border-[#cea86f] px-4 py-2 rounded transition-all duration-300 mb-8"
        >
          ← Back to Tutorials
        </Link>

        <header className="mb-12 space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold gold-text">System Design</h1>
          <p className="text-gray-400 text-sm md:text-base">
            A practical overview of the concepts behind designing systems that scale.
          </p>
        </header>

        <div className="space-y-12">
          <WhatIsSystemDesignSection />
          <ScalabilitySection />
          <AvailabilitySection />
          <CapTheoremSection />
          <LoadBalancingSection />
          <CachingSection />
          <DatabasesSection />
          <CdnSection />
          <MessageQueuesSection />
          <ArchitectureSection />
          <KeyTakeawaysSection />
        </div>
      </div>
    </div>
  )
}

export default SystemDesignPage
