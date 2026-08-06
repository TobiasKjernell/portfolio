import { Link } from 'react-router-dom'
import { WhatIsDockerSection } from '../../../components/Tutorials/WhatIsDocker'
import { DockerizingTheStackSection } from '../../../components/Tutorials/DockerizingTheStack'
import { DockerComposeSection } from '../../../components/Tutorials/DockerCompose'
import { WhyKubernetesSection } from '../../../components/Tutorials/WhyKubernetes'
import { KubernetesCoreConceptsSection } from '../../../components/Tutorials/KubernetesCoreConcepts'
import { DatabasesInKubernetesSection } from '../../../components/Tutorials/DatabasesInKubernetes'
import { ConfigAndSecretsSection } from '../../../components/Tutorials/ConfigAndSecrets'
import { DeployingTheFullStackSection } from '../../../components/Tutorials/DeployingTheFullStack'
import { DockerKubernetesKeyTakeawaysSection } from '../../../components/Tutorials/DockerKubernetesKeyTakeaways'
import { SectionMenu } from './SectionMenu'
import { MobileSectionMenu } from './MobileSectionMenu'

const DockerKubernetesPage = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold gold-text">Docker & Kubernetes</h1>
          <p className="text-gray-400 text-sm md:text-base">
            Containerizing a full stack — frontend, backend and database — step by step, from a first Dockerfile
            to a running Kubernetes deployment.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="https://docs.docker.com/get-started/docker-overview/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              Official Docker Docs ↗
            </a>
            <a
              href="https://kubernetes.io/docs/concepts/overview/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#cea86f]/40 text-[#cea86f] bg-[#cea86f]/10 hover:bg-[#cea86f]/20 transition-colors"
            >
              Official Kubernetes Docs ↗
            </a>
          </div>
        </header>

        <MobileSectionMenu />

        <div className="flex gap-12">
          <aside className="hidden lg:block w-56 shrink-0">
            <SectionMenu />
          </aside>

          <div className="flex-1 min-w-0 max-w-3xl space-y-12">
            <div id="what-is-docker" className="scroll-mt-8">
              <WhatIsDockerSection />
            </div>
            <div id="dockerizing-the-stack" className="scroll-mt-8">
              <DockerizingTheStackSection />
            </div>
            <div id="docker-compose" className="scroll-mt-8">
              <DockerComposeSection />
            </div>
            <div id="why-kubernetes" className="scroll-mt-8">
              <WhyKubernetesSection />
            </div>
            <div id="kubernetes-core-concepts" className="scroll-mt-8">
              <KubernetesCoreConceptsSection />
            </div>
            <div id="databases-in-kubernetes" className="scroll-mt-8">
              <DatabasesInKubernetesSection />
            </div>
            <div id="config-and-secrets" className="scroll-mt-8">
              <ConfigAndSecretsSection />
            </div>
            <div id="deploying-the-full-stack" className="scroll-mt-8">
              <DeployingTheFullStackSection />
            </div>
            <div id="key-takeaways" className="scroll-mt-8">
              <DockerKubernetesKeyTakeawaysSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DockerKubernetesPage
