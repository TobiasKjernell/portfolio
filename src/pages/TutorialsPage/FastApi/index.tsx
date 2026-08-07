import { Link } from 'react-router-dom'
import { WhatIsFastApiSection } from '../../../components/Tutorials/WhatIsFastApi'
import { FastApiProjectSetupSection } from '../../../components/Tutorials/FastApiProjectSetup'
import { FirstEndpointSection } from '../../../components/Tutorials/FirstEndpoint'
import { ConfigAndEnvSection } from '../../../components/Tutorials/ConfigAndEnv'
import { DatabaseConnectionSection } from '../../../components/Tutorials/DatabaseConnection'
import { FastApiModelsSection } from '../../../components/Tutorials/FastApiModels'
import { PydanticSchemasSection } from '../../../components/Tutorials/PydanticSchemas'
import { RoutersAndCrudSection } from '../../../components/Tutorials/RoutersAndCrud'
import { AuthenticationWithJwtSection } from '../../../components/Tutorials/AuthenticationWithJwt'
import { AuthorizationAndOwnershipSection } from '../../../components/Tutorials/AuthorizationAndOwnership'
import { MigrationsWithAlembicSection } from '../../../components/Tutorials/MigrationsWithAlembic'
import { TestingFastApiSection } from '../../../components/Tutorials/TestingFastApi'
import { ContainerizingFastApiSection } from '../../../components/Tutorials/ContainerizingFastApi'
import { FastApiKeyTakeawaysSection } from '../../../components/Tutorials/FastApiKeyTakeaways'
import { SectionMenu } from './SectionMenu'
import { MobileSectionMenu } from './MobileSectionMenu'

const FastApiPage = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold gold-text">FastAPI</h1>
          <p className="text-gray-400 text-sm md:text-base">
            Building a real Python backend from a completely blank folder — routing, an async database layer,
            validation, authentication and deployment — using a working blog API as the running example the whole
            way through.
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
              href="https://docs.sqlalchemy.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              Official SQLAlchemy Docs ↗
            </a>
            <a
              href="https://alembic.sqlalchemy.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              Official Alembic Docs ↗
            </a>
          </div>
        </header>

        <MobileSectionMenu />

        <div className="flex gap-12">
          <aside className="hidden lg:block w-56 shrink-0">
            <SectionMenu />
          </aside>

          <div className="flex-1 min-w-0 max-w-3xl space-y-12">
            <div id="what-is-fastapi" className="scroll-mt-8">
              <WhatIsFastApiSection />
            </div>
            <div id="project-setup" className="scroll-mt-8">
              <FastApiProjectSetupSection />
            </div>
            <div id="first-endpoint" className="scroll-mt-8">
              <FirstEndpointSection />
            </div>
            <div id="config-and-env" className="scroll-mt-8">
              <ConfigAndEnvSection />
            </div>
            <div id="database-connection" className="scroll-mt-8">
              <DatabaseConnectionSection />
            </div>
            <div id="models" className="scroll-mt-8">
              <FastApiModelsSection />
            </div>
            <div id="schemas" className="scroll-mt-8">
              <PydanticSchemasSection />
            </div>
            <div id="routers-and-crud" className="scroll-mt-8">
              <RoutersAndCrudSection />
            </div>
            <div id="authentication" className="scroll-mt-8">
              <AuthenticationWithJwtSection />
            </div>
            <div id="authorization" className="scroll-mt-8">
              <AuthorizationAndOwnershipSection />
            </div>
            <div id="migrations-with-alembic" className="scroll-mt-8">
              <MigrationsWithAlembicSection />
            </div>
            <div id="testing" className="scroll-mt-8">
              <TestingFastApiSection />
            </div>
            <div id="containerizing" className="scroll-mt-8">
              <ContainerizingFastApiSection />
            </div>
            <div id="key-takeaways" className="scroll-mt-8">
              <FastApiKeyTakeawaysSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FastApiPage
