import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const pulseTimelineRef = useRef<gsap.core.Tween | null>(null)

  useGSAP(() => {
    // Fade in hero section
    gsap.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    )

    // Animate pulsing element
    pulseTimelineRef.current = gsap.to('.pulse-element', {
      opacity: 0.3,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  })

  useEffect(() => {
    const handleScroll = () => {
      if (pulseTimelineRef.current) {
        if (window.scrollY > 300) {
          // Hide and stop pulsing
          gsap.to('.pulse-element', { opacity: 0, duration: 0.5 })
          pulseTimelineRef.current.pause()
        } else {
          // Show and resume pulsing
          pulseTimelineRef.current.play()
          gsap.to('.pulse-element', { opacity: 0.6, duration: 0.5 })
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20"
    >
      {/* Background image with blur */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/coderealbackup.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)',
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-1"></div>

      <div className="relative z-10 text-center max-w-3xl pointer-events-auto">
        <h1 className="text-5xl md:text-7xl font-bold gold-text mb-4">
          Tobias Kjernell
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Frontend Developer & Unity3D Developer
        </p>
        <p className="text-base md:text-lg text-gray-400 mb-12">
          Building solutions
        </p>

        {/* Hero Image Placeholder */}
        <div className="w-64 h-64 md:w-80 md:h-80 mx-auto bg-linear-to-br from-[#222222] to-[#1a1a1a] rounded-lg flex items-center justify-center border-2 border-[#cea86f] shadow-2xl overflow-hidden">
          <img src='tobbe2.jpg' className='object-cover h-full grayscale' />
        </div>

        <div className='flex gap-5 items-center justify-center'>

          {/* LinkedIn Button */}
          <a
            href="https://www.linkedin.com/in/tobias-kjernell-4b50b113a/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 px-6 py-2 border-2 border-[#cea86f] text-[#cea86f] font-semibold rounded-lg hover:bg-[#cea86f] hover:text-[#222222] transition-all duration-300 inline-block"
          >
            LinkedIn
          </a>

          <Link
            to="/worksearch"
            className="mt-6 px-6 py-2 border-2 border-[#cea86f] text-[#cea86f] font-semibold rounded-lg hover:bg-[#cea86f] hover:text-[#222222] transition-all duration-300 inline-block"
          >
            Work Search
          </Link>
        </div>
      </div>

      {/* Pulsing Faded Element */}
      <div
        className="pulse-element absolute bottom-0 left-0 w-full z-20"
        style={{
          height: '30px',
          background: 'linear-gradient(to bottom, transparent, #cea86f)',
          opacity: 0.6,
        }}
      ></div>
    </section>
  )
}
