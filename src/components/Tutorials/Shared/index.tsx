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

export const StepList = ({ steps }: { steps: string[] }) => (
  <ol className="space-y-2">
    {steps.map((step, index) => (
      <li
        key={step}
        className="flex gap-3 text-gray-300 text-sm bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#cea86f]/20"
      >
        <span className="gold-text font-semibold shrink-0">{index + 1}.</span>
        {step}
      </li>
    ))}
  </ol>
)

const TOKEN_PATTERN =
  /(\/\/.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|(\b(?:const|let|var|function|return|interface|type|import|export|from|if|else|for|while|extends|implements|new|as|void|null|undefined|true|false|this|typeof|async|await|default|of|in|class|public|private|readonly|static|switch|case|break|continue|try|catch|finally|throw|do|instanceof)\b)|(\b(?:string|number|boolean|any|unknown|never|object|symbol|bigint)\b)|(\b\d+(?:\.\d+)?\b)|(\b[A-Z][A-Za-z0-9_]*\b)|([a-zA-Z_$][\w$]*(?=\())/g

// Order matches the capture groups in TOKEN_PATTERN above
const TOKEN_CLASSES = [
  'text-gray-500 italic', // comment
  'text-emerald-400', // string
  'text-[#c792ea]', // keyword
  'text-sky-400', // built-in type (string, number, boolean...)
  'text-orange-300', // number literal
  'text-teal-300', // capitalized type / interface / component name
  'text-pink-300', // function call
]

const tokenizeLine = (line: string) => {
  const tokens: { text: string; className?: string }[] = []
  let lastIndex = 0
  TOKEN_PATTERN.lastIndex = 0

  let match: RegExpExecArray | null
  while ((match = TOKEN_PATTERN.exec(line))) {
    if (match.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, match.index) })
    }
    const groupIndex = match.slice(1).findIndex((group) => group !== undefined)
    tokens.push({ text: match[0], className: TOKEN_CLASSES[groupIndex] })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex) })
  }
  return tokens
}

export const CodeBlock = ({ children, label }: { children: string; label?: string }) => {
  const lines = children.replace(/\n$/, '').split('\n')

  return (
    <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg overflow-hidden">
      {label && (
        <div className="px-4 py-2 border-b border-[#cea86f]/20">
          <span className="text-xs uppercase tracking-wider text-gray-500">{label}</span>
        </div>
      )}
      <pre className="overflow-x-auto py-4 text-xs leading-relaxed">
        <code className="table w-full text-gray-300">
          {lines.map((line, index) => (
            <div key={index} className="table-row">
              <span className="table-cell select-none text-gray-600 text-right pl-4 pr-4 w-8">
                {index + 1}
              </span>
              <span className="table-cell pr-4">
                {tokenizeLine(line).map((token, tokenIndex) =>
                  token.className ? (
                    <span key={tokenIndex} className={token.className}>
                      {token.text}
                    </span>
                  ) : (
                    token.text
                  ),
                )}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}

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
