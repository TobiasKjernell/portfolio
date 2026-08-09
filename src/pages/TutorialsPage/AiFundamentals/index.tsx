import { Link } from 'react-router-dom'
import { WhatIsAiSection } from '../../../components/Tutorials/WhatIsAi'
import { HowLlmsThinkSection } from '../../../components/Tutorials/HowLlmsThink'
import { TransformersSection } from '../../../components/Tutorials/Transformers'
import { TrainingLifecycleSection } from '../../../components/Tutorials/TrainingLifecycle'
import { EmbeddingsAndVectorSearchSection } from '../../../components/Tutorials/EmbeddingsAndVectorSearch'
import { RagRetrievalAugmentedGenerationSection } from '../../../components/Tutorials/RagRetrievalAugmentedGeneration'
import { FineTuningVsRagVsPromptingSection } from '../../../components/Tutorials/FineTuningVsRagVsPrompting'
import { PromptingAndContextSection } from '../../../components/Tutorials/PromptingAndContext'
import { AgentsAndToolsSection } from '../../../components/Tutorials/AgentsAndTools'
import { AiGlossarySection } from '../../../components/Tutorials/AiGlossary'
import { AiLibrariesAndToolsSection } from '../../../components/Tutorials/AiLibrariesAndTools'
import { AiKeyTakeawaysSection } from '../../../components/Tutorials/AiKeyTakeaways'
import { SectionMenu } from './SectionMenu'
import { MobileSectionMenu } from './MobileSectionMenu'

const AiFundamentalsPage = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold gold-text">AI Fundamentals</h1>
          <p className="text-gray-400 text-sm md:text-base">
            How AI actually works, from first principles — what a language model is doing when it "thinks,"
            how it's trained, and every buzzword around embeddings, RAG, fine-tuning and agents that shows up
            once you start building with it.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="https://www.anthropic.com/research"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              Anthropic Research ↗
            </a>
            <a
              href="https://huggingface.co/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              Hugging Face Docs ↗
            </a>
          </div>
        </header>

        <MobileSectionMenu />

        <div className="flex gap-12">
          <aside className="hidden lg:block w-56 shrink-0">
            <SectionMenu />
          </aside>

          <div className="flex-1 min-w-0 max-w-3xl space-y-12">
            <div id="what-is-ai" className="scroll-mt-8">
              <WhatIsAiSection />
            </div>
            <div id="how-llms-think" className="scroll-mt-8">
              <HowLlmsThinkSection />
            </div>
            <div id="transformers" className="scroll-mt-8">
              <TransformersSection />
            </div>
            <div id="training-lifecycle" className="scroll-mt-8">
              <TrainingLifecycleSection />
            </div>
            <div id="embeddings" className="scroll-mt-8">
              <EmbeddingsAndVectorSearchSection />
            </div>
            <div id="rag" className="scroll-mt-8">
              <RagRetrievalAugmentedGenerationSection />
            </div>
            <div id="fine-tuning-vs-rag-vs-prompting" className="scroll-mt-8">
              <FineTuningVsRagVsPromptingSection />
            </div>
            <div id="prompting-and-context" className="scroll-mt-8">
              <PromptingAndContextSection />
            </div>
            <div id="agents-and-tools" className="scroll-mt-8">
              <AgentsAndToolsSection />
            </div>
            <div id="glossary" className="scroll-mt-8">
              <AiGlossarySection />
            </div>
            <div id="libraries-and-tools" className="scroll-mt-8">
              <AiLibrariesAndToolsSection />
            </div>
            <div id="key-takeaways" className="scroll-mt-8">
              <AiKeyTakeawaysSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiFundamentalsPage
