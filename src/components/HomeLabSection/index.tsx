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

const BranchConnector = ({ count }: { count: number }) => {
  const centers = Array.from({ length: count }, (_, i) => `${((i + 0.5) / count) * 100}%`)

  return (
    <div className="hidden md:block relative w-full h-8">
      <div
        className="absolute top-0 border-t-2 border-[#cea86f]"
        style={{ left: centers[0], right: `calc(100% - ${centers[centers.length - 1]})` }}
      />
      {centers.map((left, i) => (
        <div key={i} className="absolute top-0 w-px h-8 bg-[#cea86f] -translate-x-1/2" style={{ left }} />
      ))}
    </div>
  )
}

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

          {/* Branch connector: horizontal bar spanning all four columns */}
          <BranchConnector count={4} />

          {/* Four branches: two VMs, two LXCs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 w-full">
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
              <VerticalConnector />
              <LabNode
                icon="📊"
                title="Grafana + Prometheus"
                description="Also deployed on this VM via Coolify. Prometheus scrapes metrics from services on the server, and Grafana turns them into dashboards for visibility into what's running."
                techs={['Grafana', 'Prometheus']}
              />
            </div>

            {/* Branch 2: Verdaccio */}
            <div className="flex flex-col items-center gap-0">
              <LabNode
                icon="📦"
                title="VM: Verdaccio"
                description="A private NPM registry for hosting my own packages. Reachable only from devices on the home Headscale mesh, so I can read/write packages from anywhere without exposing anything publicly."
                techs={['Verdaccio', 'Private Registry']}
              />
              <VerticalConnector />
              <LabNode
                icon="🔒"
                title="NPM Packages"
                description="Personal packages published and installed privately across my machines, secured entirely behind the home mesh network."
              />
            </div>

            {/* Branch 3: Headscale */}
            <div className="flex flex-col items-center gap-0">
              <LabNode
                icon="🔑"
                title="LXC: Headscale"
                description="A self-hosted, open-source implementation of Tailscale's control server. Runs the coordination plane for the mesh — issuing keys and managing an unlimited number of accounts and devices without needing a Tailscale subscription."
                techs={['Headscale', 'WireGuard', 'Self-Hosted']}
              />
              <VerticalConnector />
              <LabNode
                icon="🛰️"
                title="Mesh VPN"
                description="Every other device and container — laptops, phones, the Verdaccio and Coolify VMs — connects to this server as its control plane instead of Tailscale's hosted one."
              />
            </div>

            {/* Branch 4: Subnet Router */}
            <div className="flex flex-col items-center gap-0">
              <LabNode
                icon="🌉"
                title="LXC: Subnet Router"
                description="A second lightweight container running the Tailscale client in subnet-router mode, registered against the home Headscale server. Advertises the home LAN so any device on the mesh can reach the whole network, not just this one box."
                techs={['Tailscale Client', 'Subnet Router']}
              />
              <VerticalConnector />
              <LabNode
                icon="🏠"
                title="Home Network Access"
                description="Lets any authorized device on the mesh — wherever it physically is — reach other devices and services on my home LAN, as if it were plugged in locally."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
