import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface LabNodeProps {
  icon: string
  title: string
  description: string
  techs?: string[]
}

const LabNode = ({ icon, title, description, techs }: LabNodeProps) => (
  <div className="lab-node w-full max-w-sm bg-[#1a1a1a] rounded-lg p-5 border-2 border-transparent hover:border-[#cea86f] transition-all duration-300 hover:shadow-lg hover:shadow-[#cea86f]/20">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-2xl">{icon}</span>
      <h3 className="text-lg font-bold gold-text">{title}</h3>
    </div>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    {techs && (
      <div className="flex flex-wrap gap-2 pt-3">
        {techs.map((tech) => (
          <span
            key={tech}
            className="inline-block bg-[#222222] text-white text-xs px-3 py-1 rounded-full border border-[#333333] hover:border-[#cea86f] transition-colors duration-200"
          >
            {tech}
          </span>
        ))}
      </div>
    )}
  </div>
)

const VerticalConnector = ({ height = 'h-8' }: { height?: string }) => (
  <div className={`w-px ${height} bg-[#cea86f]`} />
)

export const HomeLabSection = () => {
  const labRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const nodes = labRef.current?.querySelectorAll('.lab-node')
    if (nodes) {
      gsap.fromTo(
        nodes,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: labRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }
  })

  return (
    <section ref={labRef} className="py-20 px-4 bg-[#0f0f0f]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold gold-text mb-4 text-center">
          My Home Server
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
          Everything below runs on a physical server sitting in my home, mapped out so you can see how it's all wired together.
        </p>

        <div className="flex flex-col items-center">
          {/* Physical Server */}
          <LabNode
            icon="🖥️"
            title="Physical Server"
            description="Bare-metal hardware running 24/7 at home — the foundation everything else lives on."
          />

          <VerticalConnector />

          {/* Proxmox */}
          <LabNode
            icon="🧩"
            title="Proxmox VE"
            description="A virtualization platform (hypervisor) that splits the one physical machine into isolated virtual machines, each with its own resources and purpose."
            techs={['Proxmox VE', 'Virtualization']}
          />

          <VerticalConnector />

          {/* Branch connector: horizontal bar spanning between the two VM columns */}
          <div className="hidden md:block relative w-2/3 h-8">
            <div className="absolute left-1/4 right-1/4 top-0 border-t-2 border-[#cea86f]" />
            <div className="absolute left-1/4 top-0 w-px h-8 bg-[#cea86f] -translate-x-1/2" />
            <div className="absolute right-1/4 top-0 w-px h-8 bg-[#cea86f] translate-x-1/2" />
          </div>

          {/* Two VM branches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Branch 1: Coolify + Cloudflare */}
            <div className="flex flex-col items-center gap-0">
              <LabNode
                icon="☁️"
                title="VM: Coolify + Cloudflare"
                description="A self-hosted PaaS (Coolify) that builds and deploys my websites straight from Git, exposed to the internet securely through Cloudflare."
                techs={['Coolify', 'Docker', 'Cloudflare']}
              />
              <VerticalConnector />
              <LabNode
                icon="🌐"
                title="Websites"
                description="This portfolio and other side projects are built and served from here — pushed live automatically on every deploy."
              />
            </div>

            {/* Branch 2: Verdaccio + Tailscale */}
            <div className="flex flex-col items-center gap-0">
              <LabNode
                icon="📦"
                title="VM: Verdaccio + Tailscale"
                description="Verdaccio is a private NPM registry for hosting my own packages. Tailscale creates a private mesh VPN so I can read/write packages from any of my devices without exposing anything publicly."
                techs={['Verdaccio', 'Tailscale', 'Private VPN']}
              />
              <VerticalConnector />
              <LabNode
                icon="🔒"
                title="NPM Packages"
                description="Personal packages published and installed privately across my machines, secured entirely behind Tailscale's mesh network."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
