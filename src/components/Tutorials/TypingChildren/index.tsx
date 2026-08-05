import { CodeBlock, SectionShell } from '../Shared'

const ReactNodeSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">children Is ReactNode</span>
    <p className="text-white leading-relaxed text-sm">
      Since <code className="text-[#cea86f]">React.FC</code> is no longer the default, a component that renders{' '}
      <code className="text-[#cea86f]">children</code> needs to declare it explicitly, typed as{' '}
      <code className="text-[#cea86f]">ReactNode</code> — the type that covers everything JSX is allowed to
      render: elements, strings, numbers, arrays of those, and null/undefined:
    </p>
    <CodeBlock label="Card.tsx">{`import type { ReactNode } from 'react'

interface CardProps {
  title: string
  children: ReactNode
}

const Card = ({ title, children }: CardProps) => (
  <div className="card">
    <h3>{title}</h3>
    {children}
  </div>
)

// All valid:
<Card title="Profile">Plain text</Card>
<Card title="Profile"><Avatar /></Card>
<Card title="Profile">{condition && <Badge />}</Card>`}</CodeBlock>
  </div>
)

const NarrowerTypesSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">When ReactNode Is Too Wide</span>
    <p className="text-white leading-relaxed text-sm">
      <code className="text-[#cea86f]">ReactNode</code> is the right default, but sometimes a component genuinely
      only makes sense with a single rendered element as a child — a wrapper that clones its child to attach a
      ref, for instance. <code className="text-[#cea86f]">ReactElement</code> narrows that down by excluding
      strings, numbers, arrays and null:
    </p>
    <CodeBlock>{`import type { ReactElement } from 'react'

interface TooltipTriggerProps {
  children: ReactElement // exactly one element, not text/null/arrays
}`}</CodeBlock>
  </div>
)

const RenderPropSection = () => (
  <div className="bg-[#111111] border border-[#cea86f]/20 rounded-lg p-6 space-y-4">
    <span className="text-sm font-semibold gold-text">children as a Function</span>
    <p className="text-white leading-relaxed text-sm">
      A render-prop component passes <code className="text-[#cea86f]">children</code> a function instead of JSX
      — the type just describes that function's signature directly:
    </p>
    <CodeBlock>{`interface ListProps<T> {
  items: T[]
  children: (item: T) => ReactNode
}

const List = <T,>({ items, children }: ListProps<T>) => (
  <ul>{items.map((item, i) => <li key={i}>{children(item)}</li>)}</ul>
)`}</CodeBlock>
  </div>
)

export const TypingChildrenSection = () => (
  <SectionShell
    title="Typing children"
    paragraphs={[
      "Because React.FC isn't the default anymore, children has to be typed like any other prop — deliberately, on the props interface, not implicitly.",
    ]}
    points={[
      'ReactNode is the right default — it covers every legal thing JSX can render, including text, arrays, fragments and null',
      'Narrow to ReactElement only when the component truly requires exactly one rendered element, like a wrapper that clones its child',
      'A render-prop children function is typed as a function signature, not as ReactNode — the type just describes what the function receives and returns',
    ]}
  >
    <div className="space-y-6">
      <ReactNodeSection />
      <NarrowerTypesSection />
      <RenderPropSection />
    </div>
  </SectionShell>
)
