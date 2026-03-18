import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState, useEffect } from 'react'
import { useIntroStore } from '../../stores/useIntroStore'

export const Intro = () => {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const setIntroComplete = useIntroStore((state) => state.setIntroComplete)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useGSAP(() => {
    if (!overlayRef.current || !imageRef.current) return

    // Responsive animations using matchMedia
   
      // Desktop: animate horizontally
      gsap.to(backgroundRef.current, {
        x: 150,
        duration: 15,
        ease: 'none',
      })

      gsap.to(overlayRef.current, {
        x: -150,
        duration: 15,
        ease: 'none',
      })
  
    // Animate text words appearing one by one
    const words = overlayRef.current?.querySelectorAll('.word')
    if (words) {
      gsap.to(words, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power2.out',
      })
    }

    // Animate overlay width/height based on screen size
 
      gsap.fromTo(
        overlayRef.current,
        {
          width: '100%',
          skewX: -5,
        },
        {
          width: '50%',
          skewX: -5,
          duration: 2,
          ease: 'sine',
          immediateRender: false,
          onComplete: () => {
            setIntroComplete(true);
            // Wait, then animate component off screen
            gsap.delayedCall(1.5, () => {
              gsap.to([containerRef.current], {
                x: -window.innerWidth,
                duration: 1,
                ease: 'power3.inOut',
                onComplete: () => {
                  setShowIntro(false)
                  setIntroComplete(true)
                },
              })
              gsap.to([backgroundRef.current], {
                x: window.innerWidth,
                duration: 1,
                ease: 'power3.inOut',
              })
            })
          },
        }
      )
  
  })

  return (
    <>
      {showIntro && !isMobile &&
        <>
        <div className='overflow-hidden'>
          {/* Background image layer */}
          <div ref={backgroundRef} className="fixed top-0 left-0 w-screen h-screen z-40 overflow-hidden blur-[9px]">
            <img
              ref={imageRef}
              src="coderealbackup.png"
              alt="intro"
              className="absolute top-0 left-0 h-full object-cover"
              style={{
                width: '110%',
                objectPosition: '0% 50%',
              }}
            />
          </div>

          {/* Overlay container */}
          <div
            ref={containerRef}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            {/* Transparent black overlay with skew animation */}
            <div
              ref={overlayRef}
              className="absolute top-0 -left-20  h-[200%] bg-black/90 flex items-center justify-center"
              style={{
                transformOrigin: 'left center',
                transform: 'skewX(-5)',
              }}
            >
              {/* Text content */}
              <div
                className="text-white text-3xl font-bold text-center whitespace-nowrap"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '0',
                  transform: 'translate(-50%, 500%)',
                }}
              >
                {'Welcome to my corner /Tobias'.split(' ').map((word, index) => (
                  <span
                    key={index}
                    className="word inline-block mr-2"
                    style={{
                      opacity: 0,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>

              {/* Red outline on the skewed edge */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '3px',
                  background: '#cea86f',
                }}
              />
            </div>
          </div>
           </div>
        </>
      }
    </>
  )
}
