import { Link } from 'react-router-dom'
import { WhatIsGitSection } from '../../../components/Tutorials/WhatIsGit'
import { GitCoreWorkflowSection } from '../../../components/Tutorials/GitCoreWorkflow'
import { GitBranchingAndMergingSection } from '../../../components/Tutorials/GitBranchingAndMerging'
import { GitRemotesAndCollaborationSection } from '../../../components/Tutorials/GitRemotesAndCollaboration'
import { GitSafeUndoToolkitSection } from '../../../components/Tutorials/GitSafeUndoToolkit'
import { GitResolvingConflictsSection } from '../../../components/Tutorials/GitResolvingConflicts'
import { GitBranchingPipelineSection } from '../../../components/Tutorials/GitBranchingPipeline'
import { GitKeyTakeawaysSection } from '../../../components/Tutorials/GitKeyTakeaways'
import { SectionMenu } from './SectionMenu'
import { MobileSectionMenu } from './MobileSectionMenu'

const GitPage = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold gold-text">Git</h1>
          <p className="text-gray-400 text-sm md:text-base">
            Version control from first principles — the core workflow, branching and merging, working with
            remotes, a toolkit for undoing mistakes safely, and a branching pipeline that holds up on a real team.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="https://git-scm.com/doc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              Official Git Docs ↗
            </a>
            <a
              href="https://git-scm.com/book/en/v2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              Pro Git Book ↗
            </a>
          </div>
        </header>

        <MobileSectionMenu />

        <div className="flex gap-12">
          <aside className="hidden lg:block w-56 shrink-0">
            <SectionMenu />
          </aside>

          <div className="flex-1 min-w-0 max-w-3xl space-y-12">
            <div id="what-is-git" className="scroll-mt-8">
              <WhatIsGitSection />
            </div>
            <div id="core-workflow" className="scroll-mt-8">
              <GitCoreWorkflowSection />
            </div>
            <div id="branching-and-merging" className="scroll-mt-8">
              <GitBranchingAndMergingSection />
            </div>
            <div id="remotes" className="scroll-mt-8">
              <GitRemotesAndCollaborationSection />
            </div>
            <div id="safe-undo-toolkit" className="scroll-mt-8">
              <GitSafeUndoToolkitSection />
            </div>
            <div id="resolving-conflicts" className="scroll-mt-8">
              <GitResolvingConflictsSection />
            </div>
            <div id="branching-pipeline" className="scroll-mt-8">
              <GitBranchingPipelineSection />
            </div>
            <div id="key-takeaways" className="scroll-mt-8">
              <GitKeyTakeawaysSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GitPage
