import { useEffect, useState } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

export const ScrollNavigation = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      setIsVisible(scrolled > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const scrollToBottom = () => {
    const pageHeight = document.documentElement.scrollHeight
    window.scrollTo({
      top: pageHeight,
      behavior: 'smooth',
    })
  }

  return (
    <div
      className={`fixed right-6 bottom-6 flex flex-col gap-3 z-50 pointer-events-auto transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'
      }`}
    >
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="w-12 h-12 bg-[#1a1a1a] border-2 border-[#cea86f] rounded-lg flex items-center justify-center text-[#cea86f] hover:bg-[#cea86f] hover:text-[#0a0a0a] transition-all duration-300 hover:shadow-lg hover:shadow-[#cea86f]/50"
        title="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>

      {/* Scroll to Bottom Button */}
      <button
        onClick={scrollToBottom}
        className="w-12 h-12 bg-[#1a1a1a] border-2 border-[#cea86f] rounded-lg flex items-center justify-center text-[#cea86f] hover:bg-[#cea86f] hover:text-[#0a0a0a] transition-all duration-300 hover:shadow-lg hover:shadow-[#cea86f]/50"
        title="Scroll to bottom"
      >
        <ArrowDown size={20} />
      </button>
    </div>
  )
}
