import { useState } from 'react'
import { sections } from './sections'
import { useActiveSection } from './useActiveSection'

export const MobileSectionMenu = () => {
  const activeId = useActiveSection()
  const [isOpen, setIsOpen] = useState(false)
  const activeLabel = sections.find(({ id }) => id === activeId)?.label ?? 'On This Page'

  return (
    <div className="lg:hidden sticky top-0 z-30 -mx-6 px-6 py-3 mb-8 bg-[#0a0a0a]/95 backdrop-blur border-b border-[#cea86f]/20">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-2 text-sm bg-[#111111] border border-[#cea86f]/30 rounded-lg px-4 py-3"
      >
        <span className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] uppercase tracking-wider text-gray-500 shrink-0">On This Page</span>
          <span className="gold-text truncate">{activeLabel}</span>
        </span>
        <span className="gold-text shrink-0">{isOpen ? '▲' : '▾'}</span>
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-20 cursor-default"
          />
          <ul className="relative z-30 mt-2 max-h-[60vh] overflow-y-auto noScrollbar bg-[#111111] border border-[#cea86f]/20 rounded-lg divide-y divide-[#cea86f]/10">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-sm transition-colors ${
                    activeId === id ? 'gold-text' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
