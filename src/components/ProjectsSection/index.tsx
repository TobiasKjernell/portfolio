import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import { ProjectCard } from '../ProjectCard'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: number
  title: string
  description: string
  techs: string[],
  git: string,
  url: string,
  img?: string
}

interface ProjectsSectionProps {
  projects: Project[]
  hobby: Project[]
}

export const ProjectsSection = ({ projects, hobby }: ProjectsSectionProps) => {
  const projectsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const projectCards = projectsRef.current?.querySelectorAll('.project-card')
    if (projectCards) {
      gsap.fromTo(
        projectCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }
  })

  return (
    <section ref={projectsRef} className="py-20 px-4 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold gold-text mb-12 text-center">
          Hobby Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hobby.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
            />
          ))}
        </div>
          <div className='pb-10' />
        <h2 className="text-4xl md:text-5xl font-bold gold-text mb-12 text-center">
          School Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
