import { Link } from 'react-router-dom'
import { WhyTypeScriptSection } from '../../../components/Tutorials/WhyTypeScript'
import { TypesVsInterfacesSection } from '../../../components/Tutorials/TypesVsInterfaces'
import { TypingPropsSection } from '../../../components/Tutorials/TypingProps'
import { TypingStateSection } from '../../../components/Tutorials/TypingState'
import { TypingEventsSection } from '../../../components/Tutorials/TypingEvents'
import { TypingChildrenSection } from '../../../components/Tutorials/TypingChildren'
import { GenericsInReactSection } from '../../../components/Tutorials/GenericsInReact'
import { CustomHooksSection } from '../../../components/Tutorials/CustomHooks'
import { UtilityTypesSection } from '../../../components/Tutorials/UtilityTypes'
import { TypeScriptKeyTakeawaysSection } from '../../../components/Tutorials/TypeScriptKeyTakeaways'
import { SectionMenu } from './SectionMenu'
import { MobileSectionMenu } from './MobileSectionMenu'

const TypeScriptReactPage = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold gold-text">TypeScript with React</h1>
          <p className="text-gray-400 text-sm md:text-base">
            How to type props, state, events and hooks in a React codebase — and, just as importantly, when not
            to bother.
          </p>
        </header>

        <MobileSectionMenu />

        <div className="flex gap-12">
          <aside className="hidden lg:block w-56 shrink-0">
            <SectionMenu />
          </aside>

          <div className="flex-1 min-w-0 max-w-3xl space-y-12">
            <div id="why-typescript" className="scroll-mt-8">
              <WhyTypeScriptSection />
            </div>
            <div id="types-vs-interfaces" className="scroll-mt-8">
              <TypesVsInterfacesSection />
            </div>
            <div id="typing-props" className="scroll-mt-8">
              <TypingPropsSection />
            </div>
            <div id="typing-state" className="scroll-mt-8">
              <TypingStateSection />
            </div>
            <div id="typing-events" className="scroll-mt-8">
              <TypingEventsSection />
            </div>
            <div id="typing-children" className="scroll-mt-8">
              <TypingChildrenSection />
            </div>
            <div id="generics" className="scroll-mt-8">
              <GenericsInReactSection />
            </div>
            <div id="custom-hooks" className="scroll-mt-8">
              <CustomHooksSection />
            </div>
            <div id="utility-types" className="scroll-mt-8">
              <UtilityTypesSection />
            </div>
            <div id="key-takeaways" className="scroll-mt-8">
              <TypeScriptKeyTakeawaysSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypeScriptReactPage
