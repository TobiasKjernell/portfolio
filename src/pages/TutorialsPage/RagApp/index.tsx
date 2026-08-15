import { Link } from 'react-router-dom'
import { RagAppOverviewSection } from '../../../components/Tutorials/RagAppOverview'
import { PgvectorSetupSection } from '../../../components/Tutorials/PgvectorSetup'
import { PgvectorSchemaSection } from '../../../components/Tutorials/PgvectorSchema'
import { PgvectorSearchSection } from '../../../components/Tutorials/PgvectorSearch'
import { RagBackendSetupSection } from '../../../components/Tutorials/RagBackendSetup'
import { LlmProviderAbstractionSection } from '../../../components/Tutorials/LlmProviderAbstraction'
import { RagBackendAuthSection } from '../../../components/Tutorials/RagBackendAuth'
import { RagIngestionPipelineSection } from '../../../components/Tutorials/RagIngestionPipeline'
import { RagQueryEndpointSection } from '../../../components/Tutorials/RagQueryEndpoint'
import { RagErrorHandlingSection } from '../../../components/Tutorials/RagErrorHandling'
import { RagTestingAndDockerSection } from '../../../components/Tutorials/RagTestingAndDocker'
import { RagFrontendSetupSection } from '../../../components/Tutorials/RagFrontendSetup'
import { RagFrontendLoginSection } from '../../../components/Tutorials/RagFrontendLogin'
import { RagFrontendStateAndApiSection } from '../../../components/Tutorials/RagFrontendStateAndApi'
import { RagChatUiSection } from '../../../components/Tutorials/RagChatUi'
import { RagKeyTakeawaysSection } from '../../../components/Tutorials/RagKeyTakeaways'
import { SectionMenu } from './SectionMenu'
import { MobileSectionMenu } from './MobileSectionMenu'

const RagAppPage = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold gold-text">Building A RAG App</h1>
          <p className="text-gray-400 text-sm md:text-base">
            A hands-on build of a real Retrieval-Augmented Generation stack — a FastAPI backend that keeps every AI
            provider key server-side behind a swappable provider abstraction (OpenAI, Anthropic, or a local model
            through Ollama), Postgres with pgvector as the vector store, and a React + Tailwind frontend on top.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="https://fastapi.tiangolo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              Official FastAPI Docs ↗
            </a>
            <a
              href="https://github.com/pgvector/pgvector"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              pgvector Docs ↗
            </a>
            <a
              href="https://tanstack.com/query/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              TanStack Query Docs ↗
            </a>
          </div>
        </header>

        <MobileSectionMenu />

        <div className="flex gap-12">
          <aside className="hidden lg:block w-56 shrink-0">
            <SectionMenu />
          </aside>

          <div className="flex-1 min-w-0 max-w-3xl space-y-12">
            <div id="overview" className="scroll-mt-8">
              <RagAppOverviewSection />
            </div>
            <div id="pgvector-setup" className="scroll-mt-8">
              <PgvectorSetupSection />
            </div>
            <div id="pgvector-schema" className="scroll-mt-8">
              <PgvectorSchemaSection />
            </div>
            <div id="pgvector-search" className="scroll-mt-8">
              <PgvectorSearchSection />
            </div>
            <div id="backend-setup" className="scroll-mt-8">
              <RagBackendSetupSection />
            </div>
            <div id="provider-abstraction" className="scroll-mt-8">
              <LlmProviderAbstractionSection />
            </div>
            <div id="backend-auth" className="scroll-mt-8">
              <RagBackendAuthSection />
            </div>
            <div id="ingestion-pipeline" className="scroll-mt-8">
              <RagIngestionPipelineSection />
            </div>
            <div id="query-endpoint" className="scroll-mt-8">
              <RagQueryEndpointSection />
            </div>
            <div id="error-handling" className="scroll-mt-8">
              <RagErrorHandlingSection />
            </div>
            <div id="testing-and-docker" className="scroll-mt-8">
              <RagTestingAndDockerSection />
            </div>
            <div id="frontend-setup" className="scroll-mt-8">
              <RagFrontendSetupSection />
            </div>
            <div id="frontend-login" className="scroll-mt-8">
              <RagFrontendLoginSection />
            </div>
            <div id="frontend-state-and-api" className="scroll-mt-8">
              <RagFrontendStateAndApiSection />
            </div>
            <div id="frontend-chat-ui" className="scroll-mt-8">
              <RagChatUiSection />
            </div>
            <div id="key-takeaways" className="scroll-mt-8">
              <RagKeyTakeawaysSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RagAppPage
