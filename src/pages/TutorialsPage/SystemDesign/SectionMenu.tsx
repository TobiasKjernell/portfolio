import { sections } from './sections'
import { useActiveSection } from './useActiveSection'

export const SectionMenu = () => {
  const activeId = useActiveSection()

  return (
    <nav className="sticky top-12 max-h-[calc(100vh-6rem)] overflow-y-auto noScrollbar pr-2">
      <span className="block text-xs uppercase tracking-wider text-gray-500 mb-3">On This Page</span>
      <ul className="space-y-1 border-l border-[#cea86f]/20">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block pl-4 pr-2 py-1.5 text-sm border-l -ml-px transition-colors ${
                activeId === id
                  ? 'border-[#cea86f] gold-text'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
