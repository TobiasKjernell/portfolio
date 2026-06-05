import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const techs = ['Tailwind', 'React', 'Next.js', 'Zustand', 'Zod', 'TypeScript', 'Supabase', 'Vite', 'Leaflet', 'GSAP', 'AI', 'TanStack', 'React Forms', 'CSS Modules', 'Jest/Vitest', 'Python', 'SQLAlchemy', 'Unity']
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
              I'm a passionate developer with a love for creating intuitive, high-performance digital experiences. With expertise in modern TypeScript, React, and web technologies, I enjoy bringing ideas to life through clean, maintainable code and user-centered design.
            </p>
            <p>
              I specialize in building responsive interfaces, optimizing performance, and creating engaging interactions and animations using tools such as GSAP. I'm constantly learning and refining my skills to stay current with modern development practices.
            </p>
            <p>
              Beyond web development, I have several years of experience as a Unity developer, with a strong focus on XR applications and interactive experiences. I also enjoy creating video games and exploring new ways to blend immersive technologies with software development.
            </p>
            <p>
              The combination of frontend and backend development alongside game development gives me a unique perspective on problem-solving and product creation. Working across these disciplines allows me to approach ideas from multiple angles, experiment with innovative solutions, and build experiences that are both technically robust and engaging for users.
            </p>
            <p>
              Outside of my professional work, I spend a significant amount of time exploring AI, machine learning, and Python development. I'm continuously expanding my understanding of how intelligent systems can be integrated into applications and how AI can be leveraged to improve development workflows, productivity, and user experiences.
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
