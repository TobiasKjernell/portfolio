import type { ReactNode } from 'react'

export const SectionShell = ({
  title,
  paragraphs,
  points,
  children,
}: {
  title: string
  paragraphs: string[]
  points?: string[]
  children?: ReactNode
}) => (
  <section className="space-y-4">
    <h2 className="text-2xl font-bold gold-text">{title}</h2>
    {paragraphs.map((paragraph, index) => (
      <p key={index} className="text-white leading-relaxed">
        {paragraph}
      </p>
    ))}
    {points && (
      <ul className="space-y-2 mt-2">
        {points.map((point) => (
          <li
            key={point}
            className="flex gap-3 text-gray-300 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20"
          >
            <span className="gold-text">→</span>
            {point}
          </li>
        ))}
      </ul>
    )}
    {children}
  </section>
)

export const Panel = ({
  label,
  caption,
  children,
}: {
  label: string
  caption: string
  children: ReactNode
}) => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 flex flex-col items-center gap-3">
    <span className="text-xs uppercase tracking-wider text-gray-500">{label}</span>
    {children}
    <span className="text-xs text-gray-400 text-center">{caption}</span>
  </div>
)

export const Box = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div
    className={`rounded border-2 border-[#cea86f] flex items-center justify-center text-center text-[11px] text-gray-300 px-3 py-2 ${className}`}
  >
    {children}
  </div>
)

export const Arrow = ({ dir = 'down' }: { dir?: 'down' | 'right' }) => (
  <span className="gold-text text-lg leading-none">{dir === 'down' ? '↓' : '→'}</span>
)

export const ProsConsCard = ({
  title,
  pros,
  cons,
}: {
  title: string
  pros: string[]
  cons: string[]
}) => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-5 flex flex-col gap-4">
    <span className="text-sm font-semibold gold-text">{title}</span>

    <div className="space-y-2">
      <span className="text-[10px] uppercase tracking-wider text-green-400/80">Pros</span>
      <ul className="space-y-1.5">
        {pros.map((pro) => (
          <li key={pro} className="flex gap-2 text-gray-300 text-sm">
            <span className="text-green-400/80">✓</span>
            {pro}
          </li>
        ))}
      </ul>
    </div>

    <div className="space-y-2">
      <span className="text-[10px] uppercase tracking-wider text-red-400/80">Cons</span>
      <ul className="space-y-1.5">
        {cons.map((con) => (
          <li key={con} className="flex gap-2 text-gray-300 text-sm">
            <span className="text-red-400/80">✕</span>
            {con}
          </li>
        ))}
      </ul>
    </div>
  </div>
)
