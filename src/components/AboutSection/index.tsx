import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const techs = ['Tailwind', 'React', 'Next.js', 'Zustand', 'Zod', 'TypeScript', 'Supabase', 'Vite', 'Leaflet', 'GSAP', 'Claude AI', 'TanStack', 'React Forms', 'CSS Modules']

export const AboutSection = () => {
  const aboutRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      aboutRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )
  })

  return (
    <section ref={aboutRef} className="py-20 px-4 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold gold-text mb-12 text-center">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-4 text-gray-300">
            <p>
              I'm a passionate developer with a love for creating intuitive and performant web
              applications. With expertise in modern TypeScript, React, I
              bring ideas to life through clean, maintainable code.
            </p>
            <p>
              I specialize in building responsive interfaces based on UX, optimizing performance, and implementing
              engaging animations using tools like GSAP. Always learning, always improving. Toward the end of my education, I began using Claude AI to speed up my workflow and better understand today’s industry standards.
            </p>
            <p>
              Outside of my education and internship, I focus heavily on AI, machine learning, and Python. I’m working to better understand how to implement AI solutions and how to improve efficiency within my coding pipeline.
            </p>
            <p>
              When I’m not coding, you can usually find me in my rehearsal studio playing drums. I love music, i hope you do too  .
            </p>
            
            <h2>My go-to techstack</h2>
            <div className="flex flex-wrap gap-2 pt-2">
              
              {techs.map((tech) => (
                <span
                  key={tech}
                  className="inline-block bg-[#222222] text-white text-xs px-3 py-1 rounded-full border border-[#333333] hover:border-[#cea86f] transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Avatar Placeholder */}
          <div className="flex justify-center">
            <div className="bg-linear-to-br from-[#222222] to-[#1a1a1a] rounded-lg flex items-center justify-center border-2 border-[#cea86f] overflow-hidden">
              <img src='drums.jpg' alt='drums' className='grayscale' />
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}
