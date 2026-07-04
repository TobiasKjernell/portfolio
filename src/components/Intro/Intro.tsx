import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useIntroStore } from '../../stores/useIntroStore'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const NAME = 'TOBIAS KJERNELL'

export const Intro = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const topPanelRef = useRef<HTMLDivElement>(null)
  const bottomPanelRef = useRef<HTMLDivElement>(null)
  const scanLineRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const seamRef = useRef<HTMLDivElement>(null)
  const [showIntro, setShowIntro] = useState(true)
  const setIntroComplete = useIntroStore((state) => state.setIntroComplete)

  useGSAP(() => {
    if (!containerRef.current) return

    const letterEls = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>('.intro-letter')
    )

    const tl = gsap.timeline()

    // Scan line sweeps — duration synced with last letter reveal
    tl.to(scanLineRef.current, {
      left: '105%',
      duration: 1.8,
      ease: 'power2.inOut',
    }, 0)

    // Animate each letter element directly — reliable on all platforms
    letterEls.forEach((el, i) => {
      const finalChar = el.dataset.char!
      tl.to(el, {
        opacity: 1,
        duration: 0.35,
        ease: 'none',
        onUpdate: () => {
          el.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]
        },
        onComplete: () => {
          el.textContent = finalChar
          gsap.fromTo(el, { color: '#cea86f' }, { color: '#ffffff', duration: 0.8 })
        },
      }, i * 0.1 + 0.15)
    })

    tl.to(taglineRef.current, {
      opacity: 0.6,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, 2.2)

    tl.to(progressBarRef.current, {
      width: '100%',
      duration: 1.6,
      ease: 'power1.inOut',
    }, 3.0)

    tl.to(contentRef.current, {
      opacity: 0,
      duration: 0.4,
    }, 4.8)

    // Trigger site render before panels move so content is ready when revealed
    tl.call(() => setIntroComplete(true), [], 4.9)

    // Fade the center seam just before the split
    tl.to(seamRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, 5.0)

    tl.to(topPanelRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power3.inOut',
    }, 5.1)

    tl.to(bottomPanelRef.current, {
      yPercent: 100,
      duration: 0.9,
      ease: 'power3.inOut',
      onComplete: () => setShowIntro(false),
    }, 5.1)
  }, { scope: containerRef, dependencies: [] })

  if (!showIntro) return null

  return (
    <div ref={containerRef} className="fixed inset-0 z-50">
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 right-0 h-1/2"
        style={{ background: '#080808', zIndex: 10 }}
      />
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{ background: '#080808', zIndex: 10 }}
      />

      {/* Gold seam at center */}
      <div
        ref={seamRef}
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: '50%',
          height: '1px',
          zIndex: 15,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(206,168,111,0.2) 15%, rgba(206,168,111,0.7) 50%, rgba(206,168,111,0.2) 85%, transparent 100%)',
        }}
      />

      {/* Scan line */}
      <div
        ref={scanLineRef}
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          left: '-5%',
          width: '2px',
          zIndex: 25,
          background:
            'linear-gradient(to bottom, transparent 0%, #cea86f 30%, #fff 50%, #cea86f 70%, transparent 100%)',
          boxShadow:
            '0 0 12px #cea86f, 0 0 28px rgba(206,168,111,0.5), 0 0 55px rgba(206,168,111,0.15)',
        }}
      />

      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ zIndex: 20 }}
      >
        {/* Name — single row, responsive via clamp */}
        <div className="flex items-center" style={{ letterSpacing: '0.15em' }}>
          {NAME.split('').map((_c, i) =>
            NAME[i] === ' ' ? (
              <span key={i} style={{ display: 'inline-block', width: '0.6em' }} />
            ) : (
              <span
                key={i}
                className="intro-letter font-bold"
                data-char={NAME[i]}
                style={{
                  fontSize: 'clamp(1.1rem, 5vw, 3.5rem)',
                  fontFamily: 'monospace',
                  color: '#ffffff',
                  opacity: 0,
                  display: 'inline-block',
                }}
              >
                {CHARS[Math.floor(Math.random() * CHARS.length)]}
              </span>
            )
          )}
        </div>

        {/* Tagline */}
        <div
          ref={taglineRef}
          className="text-white uppercase mt-12 md:mt-5 text-center px-4"
          style={{
            opacity: 0,
            transform: 'translateY(8px)',
            fontSize: 'clamp(0.5rem, 1.5vw, 0.75rem)',
            letterSpacing: 'clamp(0.1em, 0.5vw, 0.65em)',
          }}
        >
          Frontend Developer{' '}
          <span style={{ color: '#cea86f', margin: '0 0.3em' }}>·</span>
          {' '}Unity3D Developer
        </div>

        {/* Progress bar */}
        <div
          className="mt-10 overflow-hidden"
          style={{
            width: 'clamp(6rem, 20vw, 10rem)',
            height: '1px',
            background: 'rgba(255,255,255,0.08)',
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              width: '0%',
              height: '100%',
              background: '#cea86f',
              boxShadow: '0 0 8px rgba(206,168,111,0.8)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
