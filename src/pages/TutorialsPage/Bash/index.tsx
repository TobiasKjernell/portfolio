import { Link } from 'react-router-dom'
import { WhatIsBashSection } from '../../../components/Tutorials/WhatIsBash'
import { BashShellBasicsSection } from '../../../components/Tutorials/BashShellBasics'
import { BashVariablesSection } from '../../../components/Tutorials/BashVariables'
import { BashExpansionsGlobbingSection } from '../../../components/Tutorials/BashExpansionsGlobbing'
import { BashIoRedirectionSection } from '../../../components/Tutorials/BashIoRedirection'
import { BashConditionalsSection } from '../../../components/Tutorials/BashConditionals'
import { BashLoopsSection } from '../../../components/Tutorials/BashLoops'
import { BashJobControlSection } from '../../../components/Tutorials/BashJobControl'
import { BashFunctionsSection } from '../../../components/Tutorials/BashFunctions'
import { BashScriptsSection } from '../../../components/Tutorials/BashScripts'
import { BashAdvancedSection } from '../../../components/Tutorials/BashAdvanced'
import { BashShellConfigSection } from '../../../components/Tutorials/BashShellConfig'
import { BashKeyTakeawaysSection } from '../../../components/Tutorials/BashKeyTakeaways'
import { SectionMenu } from './SectionMenu'
import { MobileSectionMenu } from './MobileSectionMenu'

const BashFundamentalsPage = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold gold-text">Bash: Beginner to Advanced</h1>
          <p className="text-gray-400 text-sm md:text-base">
            What Bash actually is and how it works, from your first command to writing real scripts — variables,
            quoting, globbing, pipes, conditionals, loops, job control, functions, argument parsing, arrays,
            regex, and the shell config that ties it all together.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="https://www.gnu.org/software/bash/manual/bash.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              GNU Bash Manual ↗
            </a>
            <a
              href="https://www.shellcheck.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              ShellCheck ↗
            </a>
          </div>
        </header>

        <MobileSectionMenu />

        <div className="flex gap-12">
          <aside className="hidden lg:block w-56 shrink-0">
            <SectionMenu />
          </aside>

          <div className="flex-1 min-w-0 max-w-3xl space-y-12">
            <div id="what-is-bash" className="scroll-mt-8">
              <WhatIsBashSection />
            </div>
            <div id="commands-exit-codes" className="scroll-mt-8">
              <BashShellBasicsSection />
            </div>
            <div id="variables" className="scroll-mt-8">
              <BashVariablesSection />
            </div>
            <div id="expansions-globbing" className="scroll-mt-8">
              <BashExpansionsGlobbingSection />
            </div>
            <div id="io-redirection" className="scroll-mt-8">
              <BashIoRedirectionSection />
            </div>
            <div id="conditionals" className="scroll-mt-8">
              <BashConditionalsSection />
            </div>
            <div id="loops" className="scroll-mt-8">
              <BashLoopsSection />
            </div>
            <div id="job-control" className="scroll-mt-8">
              <BashJobControlSection />
            </div>
            <div id="functions" className="scroll-mt-8">
              <BashFunctionsSection />
            </div>
            <div id="scripts" className="scroll-mt-8">
              <BashScriptsSection />
            </div>
            <div id="advanced" className="scroll-mt-8">
              <BashAdvancedSection />
            </div>
            <div id="shell-config" className="scroll-mt-8">
              <BashShellConfigSection />
            </div>
            <div id="key-takeaways" className="scroll-mt-8">
              <BashKeyTakeawaysSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BashFundamentalsPage
